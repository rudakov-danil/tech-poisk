# Generated by Django 4.2.7 on 2024-02-26 12:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('aggregator', '0021_remove_property_component_type_property_order_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='property',
            old_name='property_category',
            new_name='category',
        ),
    ]
