# Generated by Django 4.2.7 on 2024-04-09 16:08

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("aggregator", "0056_incompatibleprocessorchipset_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="component",
            name="incompatible_with",
            field=models.ManyToManyField(blank=True, to="aggregator.component"),
        ),
    ]
