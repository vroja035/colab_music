# Generated by Django 4.1.12 on 2023-10-15 19:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_room_code'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='current_song',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
