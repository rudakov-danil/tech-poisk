# Generated by Django 4.2.7 on 2024-02-26 04:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aggregator', '0018_remove_componenttype_label_componenttype_slug_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='componenttype',
            name='name',
            field=models.CharField(max_length=50),
        ),
    ]
