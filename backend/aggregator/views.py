from django.db.models import F, Q, Min, Max, Value, BooleanField, JSONField, Case, When, OuterRef, Subquery, Count
from django.db.models.functions import Coalesce
from django.core.exceptions import BadRequest
from rest_framework import generics
from rest_framework import pagination
from rest_framework import permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.generics import UpdateAPIView
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.mail import send_mail
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.template.loader import render_to_string

from django.utils.html import strip_tags

from .utils.trigram_similarity_search_filter import TrigramWordSimilaritySearchFilter
import json

from .models import *
from .serializers import *
from techpoisk import settings


class MyPagination(pagination.PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 200


class ComponentsView(generics.ListCreateAPIView):
    permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]
    queryset = Component.objects.all().order_by('-id')
    serializer_class = ComponentSerializer
    filter_backends = [
        DjangoFilterBackend,
        TrigramWordSimilaritySearchFilter,
    ]
    search_fields = [
        'name',
        'component_type__name',
        'component_type__slug',
        'component_type__search_tags',
    ]
    pagination_class = MyPagination

    def get_serializer_context(self, *args, **kwargs):
        context = super().get_serializer_context(*args, **kwargs)
        context['hide_non_short_props'] = json.loads(self.request.query_params.get('hide_non_short_props', 'false'))
        return context

    def filter_queryset(self, queryset):
        if 'component_type' in self.request.query_params:
            component_types = self.request.query_params['component_type'].split(',')
            queryset = queryset.filter(component_type__slug__in=component_types)

        if 'min_price' in self.request.query_params:
            queryset = queryset \
                .annotate(min_price=Min('offers__price')) \
                .filter(min_price__gte=int(self.request.query_params['min_price']))

        if 'max_price' in self.request.query_params:
            queryset = queryset \
                .annotate(min_price=Min('offers__price')) \
                .filter(min_price__lte=int(self.request.query_params['max_price']))

        queryset = queryset.annotate(is_compatible=Value(True, output_field=BooleanField()))

        if 'compatible_with' in self.request.query_params:
            check_against_components_ids = self.request.query_params['compatible_with'].split(',')
            check_against_components = Component.objects.filter(
                id__in=check_against_components_ids)
            for check_against_component in check_against_components:
                incompatible_query = Q(pk__in=check_against_component.incompatible_with.all())

                if 'hide_incompatible' in self.request.query_params:
                    queryset = queryset.filter(~incompatible_query)
                else:
                    # TODO: optimize
                    queryset = queryset.annotate(is_compatible=Case(
                        When(incompatible_query, then=Value(False)),
                        default=F('is_compatible')
                    )).distinct().filter(~Q(incompatible_query, is_compatible=True))

        # Filtering by component's properties
        used_params = [
            'search',
            'page_size',
            'page',
            'component_type',
            'min_price',
            'max_price',
            'ordering',
            'compatible_with',
            'hide_incompatible',
            'stat',
            'hide_non_short_props'
        ]
        for param, values_string in self.request.query_params.items():
            if param in used_params:
                continue

            values = values_string.split(',')
            queryset = queryset.filter(
                properties__in=Property.objects.select_related("property_proto").prefetch_related("values").filter(
                    property_proto__slug=param,
                    values__value__in=values,
                ).distinct()
            )
            if queryset.count() == 0:
                return queryset

        for backend in ComponentsView.filter_backends:
            queryset = backend().filter_queryset(self.request, queryset, view=self)

        self._min_offer_prices = queryset.annotate(
            min_offer_price=Min('offers__price'))
        order_list = []
        if 'ordering' in self.request.query_params:
            ordering = self.request.query_params['ordering']

            if ordering in ('price', '-price'):
                if '-' in ordering:
                    queryset = queryset.annotate(min_price=Min('offers__price'))
                    order_list.append('-min_price')
                else:
                    queryset = queryset.annotate(max_price=Max('offers__price'))
                    order_list.append('max_price')
            elif ordering in ('name', '-name'):
                order_list.append(ordering)
            else:
                is_negative = '-' in ordering
                if is_negative:
                    ordering = ordering[1:]
                if ordering not in PropertyProto.objects.values_list('slug', flat=True):
                    raise BadRequest(f'Unknown ordering field: {ordering}')
                # Components from queryset that have property from `ordering` specified
                queryset_with_prop = queryset \
                    .annotate(slug=F('properties__property_proto__slug')) \
                    .filter(slug=ordering) \
                    .annotate(value=F('properties__property_value_pairs__existing_property_value__value'))
                # Components from queryset that don't
                queryset_without_prop = queryset \
                    .filter(~Q(id__in=queryset_with_prop)) \
                    .annotate(
                    slug=Value(ordering),
                    value=Value(None, output_field=models.JSONField()))

                queryset = queryset_with_prop.union(queryset_without_prop, all=True)
                order_list.append('-value' if is_negative else 'value')
        if 'search' in self.request.query_params:
            order_list.insert(0, '-similarity')
        queryset = queryset.alias(max_price=Max("offers__price")).filter(max_price__gt=0)
        order_list.append('id')
        queryset = queryset.order_by(*order_list)
        return queryset

    def list(self, request, *args, **kwargs):
        response = super(ComponentsView, self).list(request, *args, **kwargs)
        if response.data["count"] == 0:
            return response
        response.data['min_price'] = self._min_offer_prices.aggregate(
            min_price=Min('min_offer_price'))['min_price'] / 100
        response.data['max_price'] = self._min_offer_prices.aggregate(
            max_price=Max('min_offer_price'))['max_price'] / 100

        response.data['page_size'] = min(
            int(request.query_params.get(
                'page_size',
                getattr(self.pagination_class, 'page_size', 0)
            )),
            getattr(self.pagination_class, 'max_page_size', 0),
        )
        if response.data['page_size'] == 0:
            del response.data['page_size']

        try:
            is_stat = json.loads(self.request.query_params.get('stat', 'false'))
        except json.JSONDecodeError:
            is_stat = True

        if is_stat:
            del response.data['results']
            del response.data['next']
            del response.data['previous']
            del response.data['page_size']

        return response


class CheckCompatibilityView(APIView):
    def get(self, request):
        ids = request.query_params.get("ids", "-1").split(",")
        ids = [int(id) for id in ids if id != ""]
        if len(ids) == 0:
            return Response({"incompatible": []})
        components = Component.objects.filter(id__in=ids)
        response = []
        for i in range(len(components)):
            for j in range(i, len(components)):
                if components[i].incompatible_with.filter(id=components[j].id).exists():
                    response.append([components[i].id, components[j].id])
        return Response({"incompatible": response})


class ComponentPicturesView(generics.ListCreateAPIView):
    permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]
    queryset = ComponentPicture.objects.all()
    serializer_class = ComponentPictureSerializer


class ComponentsDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]
    queryset = Component.objects.all()
    serializer_class = ComponentSerializer


class ComponentTypesContextMixin(generics.GenericAPIView):
    def get_serializer_context(self, *args, **kwargs):
        context = super().get_serializer_context(
            *args, **kwargs)

        context['hide_non_filter_props'] = json.loads(self.request.query_params.get('hide_non_filter_props', 'false'))
        context['hide_non_short_props'] = json.loads(self.request.query_params.get('hide_non_short_props', 'false'))

        context['show_values'] = self.request.query_params.get('show_values', 'never')
        if context['show_values'] not in ('never', 'filters', 'always'):
            context['show_values'] = 'never'

        context['show_count'] = json.loads(self.request.query_params.get(
            'show_count', 'false'))

        return context


class ComponentTypesView(generics.ListAPIView, ComponentTypesContextMixin):
    queryset = ComponentType.objects.all()
    serializer_class = ComponentTypeSerializer


class ComponentTypesDetailView(generics.ListAPIView, ComponentTypesContextMixin):
    queryset = ComponentType.objects.all().order_by('id')
    serializer_class = ComponentTypeSerializer

    def get_queryset(self):
        components_pk = self.kwargs['pk'].split(',')
        return self.queryset.filter(pk__in=components_pk)


class SearchHintsView(generics.GenericAPIView):
    queryset = Component.objects.all()
    serializer_class = ComponentSerializer
    renderer_classes = [JSONRenderer]
    search_fields = [
        'name',
        'component_type__name',
        'component_type__slug',
        'component_type__search_tags',
    ]

    def filter_queryset(self, queryset):
        queryset = TrigramWordSimilaritySearchFilter().filter_queryset(self.request, queryset, view=self)
        return queryset.order_by('-similarity')

    def get(self, request):
        if 'search' not in request.query_params:
            raise BadRequest(f'Search field must be specified')

        queryset = self.filter_queryset(self.queryset)
        response = queryset.values('component_type__slug', 'name')
        if 'limit' in request.query_params:
            if request.query_params['limit'].isdigit():
                response = response[:int(request.query_params['limit'])]
            else:
                raise BadRequest('limit must be integer')
        return Response(response)


class ComponentTypeCountView(APIView):

    def get(self, request):
        queryset = Component.objects.values('component_type__slug').annotate(count=Count('component_type__slug'))
        return Response(queryset)
