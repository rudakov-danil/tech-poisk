from django.db import models
from django.db.models import Q, Transform
from django.db.models import Max
from django.db.models.fields.json import KT
from django.db.models.functions import Cast
from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver
from django.core.exceptions import ValidationError

FACTORS = {'Nano-ITX': 0, 'Mini-STX': 1, 'Mini-ITX': 2, 'Mini-DTX': 3, 'Flex-ATX': 4, 'mATX': 5, 'Micro-ATX': 5,
           'Mini-ATX': 6, 'ATX': 7, 'XL-ATX': 8, 'SSI-CEB': 9, 'E-ATX': 10, 'SSI-EEB': 11, 'NanoITX': 1, 'MiniITX': 2,
           'MiniDTX': 3, 'FlexATX': 4, 'MicroATX': 5, 'MiniATX': 6, 'XLATX': 8, 'SSI CEB': 9, 'EATX': 10, 'SSI EEB': 11,
           'Thin Mini-ITX': 2, 'mBTX': 5, "EE-ATX": 12, "EEATX": 12, "Standard-ATX": 7}
SSD_FACTORS = {"22110": 1, "2242": 2, "2280": 3}


class Image(models.Model):
    height = models.PositiveIntegerField(null=True)
    width = models.PositiveIntegerField(null=True)
    file = models.ImageField(height_field='height', width_field='width')

    class Meta:
        abstract = True


class OrderedModel(models.Model):
    order = models.FloatField(blank=True)

    def save(self, *args, **kwargs):
        if not self.order:
            # Retrieve the highest existing order value and add 1
            max_value = type(self).objects.aggregate(models.Max('order'))['order__max']
            self.order = max_value + 1 if max_value is not None else 1

        super().save(*args, **kwargs)

    class Meta:
        abstract = True


def get_store_logo_url(instance, filename):
    extension = filename.split('.')[-1]
    return f'logos/stores/{instance.store.name}.{extension}'


class Store(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class StoreLogo(Image):
    file = models.ImageField(
        height_field='height',
        width_field='width',
        upload_to=get_store_logo_url
    )
    store = models.OneToOneField(
        Store, on_delete=models.CASCADE, related_name='logo', null=True)


# Needed for correct work (legacy)
def get_manufacturer_logo_url(instance, filename):
    extension = filename.split('.')[-1]
    return f'logos/manufacturers/{instance.manufacturer.name}.{extension}'


class ComponentType(models.Model):
    name = models.CharField(max_length=50)
    slug = models.CharField(max_length=50, unique=True)
    search_tags = models.TextField(default='', blank=True)
    is_multiple = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class Component(models.Model):
    component_type = models.ForeignKey(ComponentType, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    incompatible_with = models.ManyToManyField("self", blank=True)
    warnings = models.ManyToManyField("self", blank=True)

    def update_incompatible(self):
        self.incompatible_with.clear()
        incompatible_components_query = Q(pk__in=[])
        if self.component_type.slug == 'motherboard':
            incompatible_components_query = Q(
                component_type__slug='ram',
                properties__in=Property.objects.filter(
                    Q(values__comparison_value__gt=self.properties.get(
                        property_proto__slug='memory_slots').comparison_value),
                    component__component_type__slug='ram',
                    property_proto__slug='module_count',
                )
            ) | Q(
                component_type__slug="case",
                properties__in=Property.objects.filter(
                    property_proto__slug='compatible_motherboards',
                    component__component_type__slug='case',
                ).alias(max_form_factor=Max(Cast("values__comparison_value", models.IntegerField()))).filter(
                    max_form_factor__lt=self.properties.get(property_proto__slug='form_factor').comparison_value
                )
            )
            if self.properties.filter(property_proto__slug='memory_type').exists():
                incompatible_components_query = incompatible_components_query | Q(
                    component_type__slug='ram',
                    properties__in=Property.objects.filter(
                        ~Q(values__comparison_value__regex=r'"' + self.properties.get(
                            property_proto__slug='memory_type').comparison_value),
                        component__component_type__slug='ram',
                        property_proto__slug='memory_type',
                    )
                )
            if self.properties.filter(property_proto__slug='socket').exists():
                incompatible_components_query = incompatible_components_query | Q(
                    component_type__slug='processor',
                    properties__in=Property.objects.filter(
                        Q(
                            ~Q(values__comparison_value=self.properties.get(
                                property_proto__slug='socket').comparison_value),
                            property_proto__slug='socket',
                            component__component_type__slug='processor',
                        )
                    )
                ) | Q(
                    component_type__slug='cooler',
                    properties__in=Property.objects.filter(
                        ~Q(values__in=ExistingPropertyValue.objects.filter(
                            comparison_value=self.properties.get(property_proto__slug="socket").comparison_value)
                        ),
                        component__component_type__slug='cooler',
                        property_proto__slug='socket'
                    )
                )
            if self.properties.filter(property_proto__slug='chipset').exists():
                incompatible_components_query = incompatible_components_query | Q(
                    id__in=self.properties.get(
                        property_proto__slug='chipset').values.first().incompatible_processors.all()
                )
            if self.properties.filter(property_proto__slug='m2_slot_types').exists():
                incompatible_components_query = incompatible_components_query | Q(
                    component_type__slug='ssd',
                    properties__in=Property.objects.filter(
                        ~Q(values__comparison_value__in=self.properties.get(
                            property_proto__slug='m2_slot_types').comparison_value),
                        component__component_type__slug='ssd',
                        property_proto__slug='form_factor'
                    )
                )
            else:
                incompatible_components_query = incompatible_components_query | Q(
                    component_type__slug='ssd',
                    properties__in=Property.objects.filter(
                        ~Q(values__comparison_value=-1),
                        component__component_type__slug='ssd',
                        property_proto__slug='form_factor'
                    )
                )
        elif self.component_type.slug == 'processor':
            incompatible_components_query = Q(
                Q(
                    component_type__slug='motherboard',
                    properties__in=Property.objects.filter(
                        component__component_type__slug='motherboard',
                        property_proto__slug='chipset',
                        values__in=self.incompatible_chipsets.all()
                    )
                ) |
                Q(
                    component_type__slug='motherboard',
                    properties__in=Property.objects.filter(
                        ~Q(values__comparison_value=self.properties.get(
                            property_proto__slug='socket').comparison_value),
                        component__component_type__slug='motherboard',
                        property_proto__slug='socket',
                    )
                )
            )
            if self.incompatible_coolers.exists():
                incompatible_components_query = incompatible_components_query | Q(
                    component_type__slug='cooler',
                    properties__in=Property.objects.filter(
                        component__component_type__slug='cooler',
                        property_proto__slug='max_tdp',
                        values__comparison_value__lt=self.incompatible_coolers.first().tdp,
                    )
                )
        elif self.component_type.slug == "ram":
            incompatible_components_query = Q(
                Q(
                    component_type__slug='motherboard',
                    properties__in=Property.objects.filter(
                        ~Q(values__comparison_value__contains=self.properties.get(
                            property_proto__slug='memory_type').comparison_value),
                        component__component_type__slug='motherboard',
                        property_proto__slug='memory_type',
                    )
                ) |
                Q(
                    component_type__slug='motherboard',
                    properties__in=Property.objects.filter(
                        Q(values__comparison_value__lt=self.properties.get(
                            property_proto__slug='module_count').comparison_value),
                        component__component_type__slug='motherboard',
                        property_proto__slug='memory_slots',
                    )
                )
            )
        elif self.component_type.slug == "ssd":
            if self.properties.filter(property_proto__slug="form_factor", values__comparison_value__gt=0).exists():
                incompatible_components_query = Q(
                    ~Q(properties__in=Property.objects.filter(
                        values__comparison_value__contains=self.properties.get(
                            property_proto__slug="form_factor").comparison_value,
                        property_proto__slug="m2_slot_types",
                        component__component_type__slug='motherboard',
                    )),
                    component_type__slug='motherboard',
                )
            elif self.properties.filter(property_proto__slug="form_factor", values__comparison_value=0).exists():
                incompatible_components_query = Q(
                    ~Q(properties__in=Property.objects.filter(
                        property_proto__slug="m2_slot_types",
                        component__component_type__slug='motherboard',
                    )),
                    component_type__slug='motherboard',
                )
        elif self.component_type.slug == "gpu":
            dimensions = self.properties.filter(property_proto__slug="dimensions")
            if dimensions.exists():
                value = dimensions.first().comparison_value
                incompatible_components_query = incompatible_components_query | Q(
                    Q(properties__in=Property.objects.filter(
                        values__comparison_value__lt=value,
                        component__component_type__slug='case',
                        property_proto__slug='max_gpu_length'
                    )),
                    component_type__slug='case',
                )
            connectors_filter = self.properties.filter(property_proto__slug="power_connector")
            if connectors_filter.exists():
                incompatible_components_query = incompatible_components_query | Q(
                    component_type__slug='power_supply',
                    properties__in=Property.objects.filter(
                        property_proto__slug="pcie_connectors",
                        values__comparison_value__lt=connectors_filter.first().comparison_value,
                        component__component_type__slug="power_supply"
                    )
                )
            recommended_psu_filter = self.properties.filter(property_proto__slug="recommended_psu")
            if recommended_psu_filter.exists():
                incompatible_components_query = incompatible_components_query | Q(
                    component_type__slug="power_supply",
                    properties__in=Property.objects.filter(
                        property_proto__slug='power_output',
                        values__comparison_value__lt=recommended_psu_filter.first().comparison_value,
                        component__component_type__slug="power_supply"
                    )
                )
        elif self.component_type.slug == "power_supply":
            connectors_filter = self.properties.filter(property_proto__slug="pcie_connectors")
            if connectors_filter.exists():
                incompatible_components_query = incompatible_components_query | Q(
                    component_type__slug='gpu',
                    properties__in=Property.objects.filter(
                        property_proto__slug="power_connector",
                        values__comparison_value__gt=connectors_filter.first().comparison_value,
                        component__component_type__slug="gpu"
                    )
                )
            power_output_filter = self.properties.filter(property_proto__slug="power_output")
            if power_output_filter.exists():
                incompatible_components_query = incompatible_components_query | Q(
                    component_type__slug="gpu",
                    properties__in=Property.objects.filter(
                        property_proto__slug="recommended_psu",
                        values__comparison_value__gt=power_output_filter.first().comparison_value,
                        component__component_type__slug="gpu"
                    )
                )
        elif self.component_type.slug == "case":
            compatible_motherboard = self.properties.filter(property_proto__slug='compatible_motherboards')
            if compatible_motherboard.exists():
                incompatible_components_query = incompatible_components_query | Q(
                    Q(
                        component_type__slug="motherboard",
                        properties__in=Property.objects.filter(
                            values__comparison_value__gt=compatible_motherboard.annotate(
                                factor=Cast("values__comparison_value", models.IntegerField())).aggregate(
                                Max('factor'))['factor__max'],
                            component__component_type__slug='motherboard',
                            property_proto__slug='form_factor',
                        )
                    )
                )
            max_cooler_height = self.properties.filter(property_proto__slug='max_cooler_height')
            if max_cooler_height.exists():
                incompatible_components_query = incompatible_components_query | Q(
                    component_type__slug="cooler",
                    properties__in=Property.objects.filter(
                        values__comparison_value__gt=max_cooler_height.first().comparison_value,
                        component__component_type__slug='cooler',
                        property_proto__slug='cooler_height',
                    )
                )
            liquid_cooling_support = self.properties.filter(property_proto__slug="liquid_cooling_support")
            if liquid_cooling_support.exists() and not liquid_cooling_support.first().comparison_value:
                incompatible_components_query = incompatible_components_query | Q(
                    component_type__slug="liquid_cooling",
                )
            max_gpu_length = self.properties.get(
                property_proto__slug="max_gpu_length").comparison_value if self.properties.filter(
                property_proto__slug="max_gpu_length").exists() else None
            if max_gpu_length:
                incompatible_components_query = incompatible_components_query | Q(
                    component_type__slug='gpu',
                    properties__in=Property.objects.filter(
                        property_proto__slug="dimensions",
                        values__comparison_value__gt=max_gpu_length,
                        component__component_type__slug="gpu"
                    )
                )
        elif self.component_type.slug == "cooler":
            if self.properties.filter(property_proto__slug="socket").exists():
                incompatible_components_query = incompatible_components_query | Q(
                    component_type__slug='motherboard',
                    properties__in=Property.objects.filter(
                        ~Q(values__comparison_value__in=self.properties.get(
                            property_proto__slug="socket").comparison_values),
                        component__component_type__slug='motherboard',
                        property_proto__slug='socket'
                    )
                )
            if self.properties.filter(property_proto__slug="max_tdp").exists():
                incompatible_components_query = incompatible_components_query | Q(
                    component_type__slug='processor',
                    incompatible_coolers__tdp__gt=self.properties.get(property_proto__slug="max_tdp").comparison_value
                )
            cooler_height = self.properties.filter(property_proto__slug='cooler_height')
            if cooler_height.exists():
                incompatible_components_query = incompatible_components_query | Q(
                    component_type__slug="cooler",
                    properties__in=Property.objects.filter(
                        values__comparison_value__gt=cooler_height.first().comparison_value,
                        component__component_type__slug='cooler',
                        property_proto__slug='max_cooler_height',
                    )
                )
        elif self.component_type.slug == "liquid_cooling":
            incompatible_components_query = Q(
                component_type__slug='case',
                properties__in=Property.objects.filter(
                    component__component_type__slug="case",
                    property_proto__slug='liquid_cooling_support',
                    values__comparison_value=True,
                )
            )
        incompatible_components = Component.objects.filter(incompatible_components_query)
        self.incompatible_with.add(*incompatible_components)

    def update_warnings(self):
        self.warnings.clear()
        warnings_query = Q(pk__in=[])
        if self.component_type.slug == "motherboard":
            pass
        warning_components = Component.objects.filter(warnings_query)
        self.warnings.add(*warning_components)

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def clean(self):
        if self.pk is None:
            return

        if any(map(
                lambda property: self.component_type != property.property_proto.component_type,
                self.properties.all())
        ):
            raise ValidationError(
                f"component_type of component ({self.component_type}) doesn't match "
                "component_type of properties"
            )

    def __str__(self):
        return self.name


def get_component_picture_url(instance, filename):
    return f'component_pictures/{instance.component.id}_{instance.component.name}/{filename}'


class ComponentPicture(Image):
    file = models.ImageField(
        height_field='height',
        width_field='width',
        upload_to=get_component_picture_url,
        max_length=200,
    )
    component = models.ForeignKey(Component, on_delete=models.CASCADE, related_name='pictures')


class PropertyCategory(OrderedModel):
    component_type = models.ForeignKey(
        ComponentType, models.CASCADE, related_name='property_categories')
    name = models.CharField(max_length=64)

    def __str__(self):
        return self.name


class PropertyProto(OrderedModel):
    name = models.CharField(max_length=50)
    slug = models.CharField(max_length=50)
    is_filter = models.BooleanField()
    is_short = models.BooleanField(default=False)
    category = models.ForeignKey(
        PropertyCategory, on_delete=models.CASCADE, related_name='properties')

    @property
    def component_type(self):
        return self.category.component_type

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['category', 'slug'],
                name='unique_property_proto'
            )
        ]

    def clean(self):
        same_count = PropertyProto.objects.filter(
            slug=self.slug,
            category__component_type=self.category.component_type
        ).count()

        if self.pk and same_count > 1 or not self.pk and same_count > 0:
            raise ValidationError({
                'slug': "This component type already has property proto with such slug"
            })

    def __str__(self):
        return self.name


class Property(models.Model):
    component = models.ForeignKey(Component,
                                  on_delete=models.CASCADE, related_name='properties')
    property_proto = models.ForeignKey(PropertyProto,
                                       on_delete=models.CASCADE, related_name='instances')

    def clean(self):
        if self.component.component_type != self.property_proto.component_type:
            raise ValidationError({
                'component': "component_type of component doesn't match component_type of property: "f"{self.component.component_type} != {self.property_proto.component_type}"
            })

        if self.pk and any(map(
                lambda value:
                self.property_proto != value.property_proto,
                self.values.all()
        )):
            raise ValidationError({
                "Not all this property's values' prototypes are matched with "
                f"this property prototype: {self.property_proto.name}"
            })

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    @property
    def slug(self):
        return self.property_proto.slug

    @property
    def comparison_values(self):
        return [v.comparison_value for v in self.values.all()]

    @property
    def comparison_value(self):
        if self.values.count() > 1:
            raise AttributeError('Trying to access single value on property that has multiple values')

        if self.values.count() == 0:
            return None

        return self.values.first().comparison_value

    @property
    def value(self):
        if self.values.count() > 1:
            raise AttributeError('Trying to access single value on property that has multiple values')

        if self.values.count() == 0:
            return None

        return self.values.first().value

    def __str__(self):
        return f"{self.property_proto.name} on {self.component.name}"


class ExistingPropertyValue(models.Model):
    property_proto = models.ForeignKey(
        PropertyProto,
        on_delete=models.CASCADE,
        related_name='values'
    )
    props = models.ManyToManyField(
        Property,
        through='PropertyValuePair',
        related_name='values'
    )
    value = models.JSONField()
    comparison_value = models.JSONField(null=True, blank=True)
    order = models.FloatField(default=0)

    incompatible_processors = models.ManyToManyField(
        Component,
        through='IncompatibleProcessorChipset',
        through_fields=('chipset', 'processor'),
        related_name='incompatible_chipsets',
    )

    def delete_if_unused(self):
        if self.pk and self.props.count() == 0:
            self.delete()

    def clean(self):
        if self.pk and any(map(
                lambda property_value_pair:
                property_value_pair.prop.property_proto != self.property_proto,
                self.property_value_pairs.all())):
            raise ValidationError(
                "Not all properties' prototypes are matched with "
                f"this existing property value's: {self.property_proto.name}"
            )

        self.delete_if_unused()

    def save(self, *args, **kwargs):
        if self.property_proto.category.component_type.slug == "motherboard":
            if self.property_proto.slug == 'memory_type':
                self.comparison_value = self.value.split(",")[0]
            elif self.property_proto.slug == "form_factor":
                self.comparison_value = FACTORS[self.value]
            elif self.property_proto.slug == "m2_slot_types":
                self.comparison_value = [-1, 0]
                for factor in SSD_FACTORS:
                    if factor in self.value:
                        self.comparison_value.append(SSD_FACTORS[factor])
            elif self.property_proto.slug == "memory_slots":
                self.comparison_value = int(self.value.split(",")[0])
            elif self.property_proto.slug == "socket" or self.property_proto.slug == "chipset":
                self.comparison_value = self.value
        elif self.property_proto.category.component_type.slug == "processor":
            if self.property_proto.slug == "socket":
                self.comparison_value = self.value
        elif self.property_proto.category.component_type.slug == "ram":
            if self.property_proto.slug == "memory_type":
                self.comparison_value = self.value
            elif self.property_proto.slug == "module_count":
                self.comparison_value = int(self.value)
        elif self.property_proto.category.component_type.slug == "ssd":
            if self.property_proto.slug == 'form_factor':
                values = self.value.split(", ")
                if len(values) > 1:
                    self.comparison_value = SSD_FACTORS[values[1].strip()]
                elif values[0] == "M2":
                    self.comparison_value = 0
                else:
                    self.comparison_value = -1
        elif self.property_proto.category.component_type.slug == "gpu":
            if self.property_proto.slug == "power_connector":
                connectors = self.value.split(",")[0]
                expression = []
                for word in connectors.split(" "):
                    if word.isdigit() or word == "+" or word == "x":
                        expression.append(word)
                connectors_sum = 0
                if len(expression) != 0:
                    while len(expression) > 1:
                        if "x" in expression:
                            i = expression.index("x")
                            expression[i - 1] = int(expression.pop(i - 1)) * int(expression.pop(i))
                        else:
                            i = expression.index("+")
                            expression[i - 1] = int(expression.pop(i - 1)) + int(expression.pop(i))
                    connectors_sum = int(expression[0])
                self.comparison_value = connectors_sum // 8 + (1 if connectors_sum % 8 > 0 else 0)
            elif self.property_proto.slug == "dimensions":
                self.comparison_value = int(self.value.replace("мм", "").split(" x ")[0])
            elif self.property_proto.slug == "recommended_psu":
                self.comparison_value = int(self.value.replace(" Вт", ""))
        elif self.property_proto.category.component_type.slug == "power_supply":
            if self.property_proto.slug == "pcie_connectors":
                self.comparison_value = int(self.value)
            elif self.property_proto.slug == "power_output":
                self.comparison_value = int(self.value.replace(" Вт", ""))
        elif self.property_proto.category.component_type.slug == "case":
            if self.property_proto.slug == "compatible_motherboards":
                self.comparison_value = FACTORS[self.value]
            elif self.property_proto.slug == "max_gpu_length":
                self.comparison_value = int(self.value.replace("мм", "").split(",")[0])
            elif self.property_proto.slug == "max_cooler_height":
                self.comparison_value = float(self.value.replace("мм", "").split(",")[0])
            elif self.property_proto.slug == "liquid_cooling_support":
                self.comparison_value = self.value != "нет"
        elif self.property_proto.category.component_type.slug == "cooler":
            if self.property_proto.slug == "cooler_height":
                self.comparison_value = float(self.value.replace("мм", ""))
            elif self.property_proto.slug == "max_tdp":
                self.comparison_value = int(self.value.replace(" Вт", ""))
            elif self.property_proto.slug == "socket":
                self.comparison_value = self.value
        self.full_clean()
        super().save(*args, **kwargs)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['property_proto', 'value'],
                name='unique_property_value'
            )
        ]
        ordering = ('order', 'value')

    def __str__(self):
        return str(self.value)


class IncompatibleProcessorChipset(models.Model):
    processor = models.ForeignKey(Component, on_delete=models.CASCADE)
    chipset = models.ForeignKey(ExistingPropertyValue, on_delete=models.CASCADE)


class IncompatibleProcessorCooler(models.Model):
    processor = models.ForeignKey(Component, on_delete=models.CASCADE, related_name="incompatible_coolers")
    tdp = models.IntegerField(default=0)


class PropertyValuePair(models.Model):
    prop = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name='property_value_pairs'
    )
    existing_property_value = models.ForeignKey(
        ExistingPropertyValue,
        on_delete=models.CASCADE,
        related_name='property_value_pairs'
    )


@receiver(post_delete, sender=PropertyValuePair)
def delete_value_if_not_used(sender, instance, **kwargs):
    try:
        instance.existing_property_value.delete_if_unused()
    except ExistingPropertyValue.DoesNotExist:
        pass


class Offer(models.Model):
    price = models.IntegerField()
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    component = models.ForeignKey(Component, on_delete=models.CASCADE, null=True, related_name='offers')
    buy_link = models.URLField(max_length=200)

    class Meta:
        ordering = ['price']

    def __str__(self):
        return f'Offer for {self.component} in {self.store} store for {self.price / 100}'
