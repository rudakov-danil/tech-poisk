# Generated by Django 4.2.7 on 2023-11-29 15:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('aggregator', '0004_remove_offer_content_type_remove_offer_object_id_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='component',
            name='properties',
        ),
        migrations.AddField(
            model_name='property',
            name='component',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='aggregator.component'),
        ),
    ]
