# Generated by Django 4.2.7 on 2024-02-26 16:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aggregator', '0022_rename_property_category_property_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='property',
            name='order',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='propertycategory',
            name='order',
            field=models.FloatField(),
        ),
    ]
