# Generated by Django 4.2.7 on 2024-03-01 13:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('aggregator', '0031_property_multiple_values'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='propertyvalue',
            name='component',
        ),
        migrations.RemoveField(
            model_name='propertyvalue',
            name='property_proto',
        ),
        migrations.RenameModel(
            old_name='Property',
            new_name='PropertyProto',
        ),
        migrations.CreateModel(
            name='ComponentProperty',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('component', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='properties', to='aggregator.component')),
                ('property_proto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='instances', to='aggregator.propertyproto')),
            ],
        ),
        migrations.AddField(
            model_name='propertyvalue',
            name='component_property',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='values', to='aggregator.componentproperty'),
        ),
    ]
