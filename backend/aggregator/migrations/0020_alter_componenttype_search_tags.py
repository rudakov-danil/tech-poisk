# Generated by Django 4.2.7 on 2024-02-26 04:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aggregator', '0019_alter_componenttype_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='componenttype',
            name='search_tags',
            field=models.TextField(default=''),
        ),
    ]
