from django.urls import path
from aggregator.views import *


urlpatterns = [
    path('components/', ComponentsView.as_view()),
    path('components/<int:pk>/', ComponentsDetailView.as_view()),
    path('componentPictures/', ComponentPicturesView.as_view()),
    path('componentTypes/<str:pk>/', ComponentTypesDetailView.as_view()),
    path('componentTypes/', ComponentTypesView.as_view()),
    path('checkCompatibility/', CheckCompatibilityView.as_view()),
    path('searchHints/', SearchHintsView.as_view()),
    path('componentTypeCount/', ComponentTypeCountView.as_view())
]
