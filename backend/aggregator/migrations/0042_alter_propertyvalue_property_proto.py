# Generated by Django 4.2.7 on 2024-03-10 07:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('aggregator', '0041_alter_propertyvalue_value_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='propertyvalue',
            name='property_proto',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='values', to='aggregator.propertyproto'),
        ),
    ]