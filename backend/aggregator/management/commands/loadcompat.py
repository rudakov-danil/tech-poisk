from django.core.management.base import BaseCommand
from django.db.models.functions import Cast
from django.db.models import Q, CharField
from aggregator.models import *
import pandas as pd


class Command(BaseCommand):
    help = 'Load compatibility data from excel table.'

    def add_arguments(self, parser):
        parser.add_argument(
            'file_path',
            nargs=1,
            type=str,
            help='Specify path to the excel table file.'
        )

        parser.add_argument(
            'compatibility_type',
            nargs=1,
            type=str,
            help='Specify type of compatibility reflected in table. ' \
                 'One of [motherboard_processor, processor_cooler].',
        )

        parser.add_argument(
            '--sheet-name',
            dest='sheet_name',
            help='Specify name of needed sheet.',
        )

    def _handle_motherboard_processor(self, *args, **options):
        data = pd.read_excel(options['file_path'][0], sheet_name=options['sheet_name'])

        processor_col, tdp_col, chipset_col = 'Процессор', 'TDP', 'Чипсет'

        for row_n in range(data.shape[0]):
            # Empty column
            if pd.isna(data[processor_col][row_n]) \
                    and pd.isna(data[tdp_col][row_n]):
                continue

            # Socket name
            if pd.isna(data[tdp_col][row_n]):
                continue

            # No special incompatible chipsets
            if pd.isna(data[chipset_col][row_n]):
                continue

            # Processor with incompatible chipsets
            processor_name = data[processor_col][row_n]
            chipset_names = data[chipset_col][row_n].split(', ')

            for chipset_name in chipset_names:
                processors = Component.objects.filter(
                    Q(name__endswith=processor_name) | Q(name__contains=processor_name + ' '),
                    component_type__slug='processor',
                )
                print(processor_name, chipset_name, sep='\t')

                chipsets = ExistingPropertyValue.objects.filter(property_proto__slug='chipset',
                                                                value__endswith=chipset_name + '"')
                if chipsets.count() == 0:
                    continue
                chipset = chipsets.get()

                print(processors, chipset, sep='\t')

                for processor in processors:
                    incompatibility = IncompatibleProcessorChipset(
                        processor=processor,
                        chipset=chipset,
                    )
                    incompatibility.save()

    def _handle_processor_cooler(self, *args, **options):
        data = pd.read_excel(options['file_path'][0], sheet_name=options['sheet_name'])
        processor_col, tdp_col = 'Процессор', 'TDP'
        for row_n in range(data.shape[0]):
            if pd.isna(data[processor_col][row_n]) \
                    and pd.isna(data[tdp_col][row_n]):
                continue

            # tdp
            if pd.isna(data[tdp_col][row_n]):
                continue

            processor_name = data[processor_col][row_n]
            tdp = int(data[tdp_col][row_n])
            print(processor_name, tdp)
            processors = Component.objects.filter(
                Q(name__endswith=processor_name) | Q(name__contains=processor_name + ' '),
                component_type__slug='processor',
            )
            for processor in processors:
                incompatibility = IncompatibleProcessorCooler(
                    processor=processor,
                    tdp=tdp
                )
                incompatibility.save()

    def handle(self, *args, **options):
        if options['compatibility_type'][0] == 'motherboard_processor':
            self._handle_motherboard_processor(*args, **options)
        elif options['compatibility_type'][0] == 'processor_cooler':
            self._handle_processor_cooler(*args, **options)
        else:
            raise ValueError(f"Incorrect compatibility_type: {options['compatibility_type']}")
