# Generated by Django 4.2.7 on 2024-03-07 16:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aggregator', '0038_remove_manufacturerlogo_manufacturer_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='propertyproto',
            name='is_filter',
            field=models.BooleanField(default=True),
            preserve_default=False,
        ),
    ]