# Generated by Django 4.2.7 on 2024-03-23 11:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aggregator', '0051_alter_componentpicture_file'),
    ]

    operations = [
        migrations.AlterField(
            model_name='component',
            name='name',
            field=models.CharField(max_length=200),
        ),
    ]
