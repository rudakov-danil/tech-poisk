# Generated by Django 4.2.7 on 2024-04-09 13:09

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("aggregator", "0054_component_incompatible_with"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="existingpropertyvalue",
            name="incompatible_processors",
        ),
        migrations.DeleteModel(
            name="IncompatibleProcessorChipset",
        ),
    ]
