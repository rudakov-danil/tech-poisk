import operator
from django.contrib.postgres.search import TrigramWordSimilarity
from django.db.models.functions import Greatest
from rest_framework import filters
from rest_framework.filters import SearchFilter
from rest_framework.settings import api_settings
from django.utils.translation import gettext_lazy as _


class TrigramWordSimilaritySearchFilter(SearchFilter):
    search_param = api_settings.SEARCH_PARAM
    template = 'rest_framework/filters/search.html'
    search_title = _('Search')
    search_description = _('A search term.')

    def get_trigram_similarity(self, view, request):
        return getattr(view, 'trigram_similarity', 0.3)

    def get_search_terms(self, request):
        """
        Search terms are set by a ?search=... query parameter,
        and may be comma and/or whitespace delimited.
        """
        params = request.query_params.get(self.search_param, '')
        params = params.replace('\x00', '')  # strip null characters
        params = params.replace(',', ' ')
        return params.split()

    def get_search_fields(self, view, request):
        """
        Search fields are obtained from the view, but the request is always
        passed to this method. Sub-classes can override this method to
        dynamically change the search fields based on request content.
        """
        return getattr(view, 'search_fields', None)

    def filter_queryset(self, request, queryset, view):
        trigram_similarity = self.get_trigram_similarity(view, request)
        search_fields = self.get_search_fields(view, request)
        search_terms = self.get_search_terms(request)

        if not search_terms:
            return queryset

        for search_term in search_terms:
            # Greatest similarity among all fields
            greatest_similarity = Greatest(
                *[TrigramWordSimilarity(search_term, field) for field in search_fields])

            queryset = queryset \
                .annotate(similarity=greatest_similarity) \
                .filter(similarity__gte=trigram_similarity) \

        return queryset
