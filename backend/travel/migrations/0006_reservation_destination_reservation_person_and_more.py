# Generated by Django 5.0.3 on 2024-03-31 11:23

import datetime
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('travel', '0005_alter_reservation_date_made'),
    ]

    operations = [
        migrations.AddField(
            model_name='reservation',
            name='destination',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='travel.destination'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='reservation',
            name='person',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='travel.user'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='reservation',
            name='date_made',
            field=models.DateField(default=datetime.datetime(2024, 3, 31, 11, 23, 46, 612363, tzinfo=datetime.timezone.utc)),
        ),
    ]
