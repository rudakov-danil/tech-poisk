# Generated by Django 4.2.7 on 2024-03-05 17:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aggregator', '0033_rename_componentproperty_property'),
    ]

    operations = [
        migrations.AlterField(
            model_name='propertyproto',
            name='slug',
            field=models.CharField(max_length=50, unique=True),
        ),
    ]