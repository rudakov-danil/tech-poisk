import re

from django.core.management.base import BaseCommand
from django.db.models.functions import Cast
from django.db.models import Q, CharField
from aggregator.models import *


def split_cases():
    values = ExistingPropertyValue.objects.filter(property_proto__slug="compatible_motherboards",
                                                  property_proto__category__component_type__slug="case")
    for value in values:
        split = value.value.split(", ")
        for form_factor in split:
            new_value = ExistingPropertyValue.objects.get_or_create(property_proto=value.property_proto,
                                                                    value=form_factor)
            for prop in value.props.all():
                prop.values.add(new_value[0])
        if len(split) > 1:
            value.delete()


def split_cooling(slug):
    values = ExistingPropertyValue.objects.filter(property_proto__slug="socket",
                                                  property_proto__category__component_type__slug=slug)
    for value in values:
        split = value.value.split(", ")
        for socket in split:
            if socket.isdigit() or re.match("\\d*-\\d*", socket):
                socket = "LGA " + socket
            new_value = ExistingPropertyValue.objects.get_or_create(property_proto=value.property_proto,
                                                                    value=socket)
            for prop in value.props.all():
                prop.values.add(new_value[0])
        if len(split) > 1:
            value.delete()


class Command(BaseCommand):
    help = "Split value to array of values"

    def handle(self, *args, **options):
        split_cooling("cooler")
        split_cooling("liquid_cooling")
        split_cases()