# Generated by Django 4.2.7 on 2024-03-21 04:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aggregator', '0049_alter_componenttype_search_tags'),
    ]

    operations = [
        migrations.AddField(
            model_name='componenttype',
            name='is_multiple',
            field=models.BooleanField(default=False),
        ),
    ]
