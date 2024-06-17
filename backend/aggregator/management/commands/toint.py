from django.core.management.base import BaseCommand
from aggregator.models import *


class Command(BaseCommand):
    help = 'Convert all values of property to int.'

    def add_arguments(self, parser):
        parser.add_argument(
            'property_slug',
            nargs=1,
            type=str,
            help='Specify property slug.'
        )

    def handle(self, *args, **options):
        values = ExistingPropertyValue.objects.filter(
            property_proto__slug=options['property_slug'][0])
        
        if values.count() == 0:
            print(f"Property with slug '{options['property_slug'][0]}' not found.")
            return

        for value in values:
            try:
                value.value = int(value.value)
                value.save()
            except ValueError:
                print(f"Cannot convert value '{value.value}' to int.")
                continue
