# Generated by Django 5.0.3 on 2024-03-31 11:15

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('travel', '0004_alter_reservation_date_made'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reservation',
            name='date_made',
            field=models.DateField(default=datetime.datetime(2024, 3, 31, 11, 15, 23, 289906, tzinfo=datetime.timezone.utc)),
        ),
    ]
