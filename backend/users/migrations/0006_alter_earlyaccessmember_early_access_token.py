# Generated by Django 4.2.7 on 2024-01-30 08:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_earlyaccesstoken_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='earlyaccessmember',
            name='early_access_token',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='early_access_members', to='users.earlyaccesstoken'),
        ),
    ]
