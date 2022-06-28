# Generated by Django 4.0.3 on 2022-03-23 20:51

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('artists', '0001_initial'),
        ('genres', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Track',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField(verbose_name='Название трека')),
                ('date_of_release', models.DateField(default=django.utils.timezone.now, verbose_name='Дата выпуска')),
                ('soundtrack', models.FileField(upload_to='tracks/', verbose_name='Саундтрек')),
                ('cover', models.ImageField(upload_to='images/tracks_covers', verbose_name='Обложка')),
                ('description', models.TextField(verbose_name='Описание')),
                ('artists', models.ManyToManyField(related_name='tracks', to='artists.artist', verbose_name='Исполнители')),
                ('genres', models.ManyToManyField(related_name='tracks', to='genres.genre', verbose_name='Жанры')),
            ],
            options={
                'verbose_name': 'Трек',
                'verbose_name_plural': 'Треки',
            },
        ),
    ]
