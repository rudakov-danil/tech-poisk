# Generated by Django 4.2.7 on 2024-03-06 12:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('aggregator', '0036_offer_buy_link_delete_propertypossiblevalue'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='component',
            name='manufacturer',
        ),
    ]
