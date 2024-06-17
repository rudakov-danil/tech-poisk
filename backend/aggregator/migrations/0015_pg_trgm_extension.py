from django.db import migrations, models
from django.contrib.postgres.operations import TrigramExtension


class Migration(migrations.Migration):

    dependencies = [
        ('aggregator', '0014_componenttype_search_tags'),
    ]

    operations = [
        TrigramExtension(),
    ]
