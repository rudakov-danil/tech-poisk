# Generated by Django 4.2.7 on 2024-03-16 12:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aggregator', '0048_alter_propertyproto_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='componenttype',
            name='search_tags',
            field=models.TextField(blank=True, default=''),
        ),
    ]
