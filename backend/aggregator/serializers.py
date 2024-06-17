from itertools import chain
from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer
from django.core.exceptions import ValidationError
from .models import *
import secrets


class PropertyProtoSerializer(serializers.ModelSerializer):
    values = serializers.SerializerMethodField()

    class Meta:
        model = PropertyProto
        fields = ('id', 'name', 'slug', 'is_filter', 'values')

    def get_values(self, instance):
        if 'show_values' not in self.context:
            self.context['show_values'] = 'never'

        if self.context['show_values'] == 'never' or \
                self.context['show_values'] == 'filters' and not instance.is_filter:
            return None

        if self.context.get('show_count', False):
            value_counts = Component.objects.filter(
                properties__in=Property.objects.filter(
                    property_proto=instance
                )
            ).values('properties__values__value').annotate(count=models.Count('id'))
            return [
                {
                    'value': count['properties__values__value'],
                    'count': count['count']
                } for count in value_counts
            ]
        else:
            return [
                {
                    'value': value.value,
                    'count': None
                } for value in instance.values.all()
            ]


class PropertySerializer(WritableNestedModelSerializer):
    name = serializers.CharField(source='property_proto.name', read_only=True)
    slug = serializers.CharField()
    is_filter = serializers.BooleanField(source='property_proto.is_filter', read_only=True)
    is_short = serializers.BooleanField(source='property_proto.is_short', read_only=True)
    value = serializers.JSONField(write_only=True)

    class Meta:
        model = Property
        fields = ('id', 'name', 'slug', 'is_filter', 'is_short', 'value')

    def get_value(self, instance):
        if instance.values.count() < 2:
            return instance.value

        return [
            value.value
            for value in instance.values.order_by('value')
        ]

    def to_representation(self, instance):
        data = super().to_representation(instance)

        data['value'] = self.get_value(instance)
        data['slug'] = instance.slug

        return data

    def create(self, validated_data):
        values = validated_data['value']
        if type(values) != list:
            values = [values]

        property_proto = PropertyProto.objects.get(
            slug=validated_data['slug'],
            category__component_type=validated_data['component'].component_type
        )

        prop = Property(
            property_proto=property_proto,
            component=validated_data['component']
        )
        prop.save()

        for value in values:
            property_value, _ = ExistingPropertyValue.objects.get_or_create(
                property_proto=property_proto,
                value=value
            )

            prop.values.add(property_value)

        return prop


class ImageSerializer:
    class Meta:
        fields = ('id', 'width', 'height', 'file')

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['url'] = data['file']
        del data['file']
        return data


class StoreLogoSerializer(ImageSerializer, serializers.ModelSerializer):
    class Meta:
        model = StoreLogo
        fields = ImageSerializer.Meta.fields


class StoreSerializer(serializers.ModelSerializer):
    logo = StoreLogoSerializer()

    class Meta:
        model = Store
        fields = '__all__'


class OfferSerializer(WritableNestedModelSerializer):
    store = StoreSerializer('store', read_only=True)
    store_id = serializers.IntegerField(write_only=True)

    def to_representation(self, data):
        data = super(OfferSerializer, self).to_representation(data)
        data['price'] /= 100
        return data

    class Meta:
        model = Offer
        fields = ('id', 'price', 'store', 'store_id', 'buy_link')


class ComponentPictureSerializer(ImageSerializer, serializers.ModelSerializer):
    component_id = serializers.IntegerField()

    class Meta:
        model = ComponentPicture
        fields = ImageSerializer.Meta.fields + ('component_id',)


class PropertyCategorySerializer(serializers.ModelSerializer):
    properties = serializers.SerializerMethodField()

    class Meta:
        model = PropertyCategory
        fields = ('id', 'name', 'properties')

    def get_properties(self, instance):
        properties = instance.properties.all().order_by('order')

        if self.context.get('hide_non_filter_props', False):
            properties = properties.filter(is_filter=True)

        if self.context.get('hide_non_short_props', False):
            properties = properties.filter(is_short=True)

        return PropertyProtoSerializer(
            properties, many=True, context=self.context).data


class ComponentTypeSerializer(serializers.ModelSerializer):
    property_categories = serializers.SerializerMethodField()

    class Meta:
        model = ComponentType
        fields = ('id', 'name', 'slug', 'is_multiple', 'property_categories')

    def get_property_categories(self, instance):
        property_categories = instance.property_categories.all().order_by('order')
        return PropertyCategorySerializer(
            property_categories, many=True, context=self.context).data


class ComponentSerializer(WritableNestedModelSerializer):
    property_categories = serializers.SerializerMethodField(read_only=True)
    properties = PropertySerializer(many=True, write_only=True)
    offers = OfferSerializer('offers', many=True)
    component_type = serializers.SlugRelatedField(
        slug_field='slug', queryset=ComponentType.objects.all())
    pictures = ComponentPictureSerializer('pictures', many=True, read_only=True)
    is_compatible = serializers.BooleanField(required=False, read_only=True)

    class Meta:
        model = Component
        optional_fields = ['incompatible_with', ]
        exclude = ('incompatible_with',)
        depth = 2

    def get_property_categories(self, instance):
        if self.context.get('hide_non_short_props', False):
            return {
                'type': 'short',
                'properties': PropertySerializer(instance.properties.filter(property_proto__is_short=True),
                                                 many=True).data
            }
        return [
            {
                'id': category.id,
                'name': category.name,
                'type': 'full',
                'properties': PropertySerializer(
                    instance.properties.filter(property_proto__category=category).order_by('property_proto__order'),
                    many=True,
                ).data,
            }
            for category in instance.component_type.property_categories.order_by('order')
        ]

    def save(self):
        created = super().save()
        created.update_incompatible()
        return created

