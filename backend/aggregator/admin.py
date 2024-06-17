from django.contrib import admin
from django import forms
from .models import *
from django.contrib.contenttypes.admin import GenericTabularInline
from django.contrib.auth.decorators import permission_required
import nested_admin


class PropertyValuePairForm(forms.ModelForm):
    value = forms.JSONField()

    def __init__(self, instance=None, *args, **kwargs):
        super().__init__(instance=instance, *args, **kwargs)

        if not instance:
            return

        self.fields['value'].initial = instance.existing_property_value.value

    def save(self, commit=True):
        instance = super(PropertyValuePairForm, self).save(commit=False)

        existing_property_value, _ = ExistingPropertyValue \
            .objects.get_or_create(
            property_proto=self.cleaned_data['prop'].property_proto,
            value=self.cleaned_data['value']
        )

        instance.existing_property_value = existing_property_value

        return super(PropertyValuePairForm, self).save(commit=commit)

    class Meta:
        model = PropertyValuePair
        fields = ('value',)


class PropertyValuePairInline(nested_admin.NestedTabularInline):
    form = PropertyValuePairForm
    model = PropertyValuePair
    extra = 0


class PropertyInline(nested_admin.NestedTabularInline):
    model = Property
    ordering = ['property_proto__order']
    extra = 0
    inlines = [PropertyValuePairInline]

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == 'property_proto' \
                and request.resolver_match.url_name == 'aggregator_component_change':
            component_id = request.resolver_match.kwargs['object_id']
            component_type = Component.objects.get(pk=component_id).component_type
            kwargs['queryset'] = PropertyProto.objects.filter(category__component_type=component_type)

        return super().formfield_for_foreignkey(db_field, request, **kwargs)

    def get_readonly_fields(self, request, obj=None):
        if obj:
            return ['property_proto']

        return []


class ExistingPropertyValueInline(nested_admin.NestedTabularInline):
    model = ExistingPropertyValue
    extra = 0
    fields = ['order', 'value']


class PropertyProtoInline(nested_admin.NestedTabularInline):
    model = PropertyProto
    ordering = ['order']
    extra = 0
    # inlines = [ExistingPropertyValueInline]


class PropertyCategoryInline(nested_admin.NestedTabularInline):
    model = PropertyCategory
    ordering = ['order']
    extra = 0
    inlines = [PropertyProtoInline]


class StoreLogoInline(admin.TabularInline):
    model = StoreLogo
    fields = ('file',)


class ComponentPictureInline(nested_admin.NestedTabularInline):
    model = ComponentPicture
    fields = ('file',)


class ComponentAdmin(nested_admin.NestedModelAdmin):
    readonly_fields = ('id',)
    list_display = ('name', 'component_type')
    list_filter = ('component_type',)
    search_fields = ('name', 'component_type__name')
    filter_horizontal = ('incompatible_with',)
    inlines = [PropertyInline, ComponentPictureInline]
    ordering = ['name']  # Добавлено для установки сортировки по имени по умолчанию
    raw_id_fields = ('component_type',)  # Добавлено для улучшения производительности


class ComponentTypeAdmin(nested_admin.NestedModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    inlines = [PropertyCategoryInline]


class OfferAdmin(admin.ModelAdmin):
    list_display = ('component', 'store', 'price')
    list_filter = ('store',)
    search_fields = ('component__name', 'store__name')
    raw_id_fields = ('component', 'store')  # Добавлено для улучшения производительности


class StoreAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    list_display = ('name',)
    search_fields = ('name',)
    inlines = [StoreLogoInline]


class PropertyProtoAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    list_display = ('name', 'component_type', 'slug',)
    search_fields = ('category__component_type__name', 'slug')


admin.site.register(Component, ComponentAdmin)
admin.site.register(ComponentType, ComponentTypeAdmin)
admin.site.register(Offer, OfferAdmin)
admin.site.register(Store, StoreAdmin)
admin.site.register(PropertyProto, PropertyProtoAdmin)
