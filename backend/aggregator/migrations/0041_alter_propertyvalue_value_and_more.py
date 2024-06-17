# Generated by Django 4.2.7 on 2024-03-08 09:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aggregator', '0040_remove_propertyvalue_component_property_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='propertyvalue',
            name='value',
            field=models.JSONField(),
        ),
        migrations.AddConstraint(
            model_name='propertyvalue',
            constraint=models.UniqueConstraint(fields=('property_proto', 'value'), name='unique_property_value'),
        ),
    ]
