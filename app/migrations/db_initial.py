# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2018-05-16 02:34
from __future__ import unicode_literals
from django.db import migrations, models
from django.contrib.auth.models import User
import datetime

def db_initialize(apps, schema_editor):
    Clothes = apps.get_model("app", "Clothes")
    Tag = apps.get_model("app", "Tag")
    admin = User.objects.create_superuser('admin', '', 'password', last_login=datetime.datetime.now())

    Clothes.objects.create(owner_id=admin.id, image='wildcard.jpeg', is_wildcard=True)
    with open('app/tags.txt', 'r') as tag_file:
        id = 0
        type = ''
        content = ''
        for line in tag_file:
            line = line[:-1]
            if line in ['Color', 'Season', 'Texture', 'Category']:
                type=line
                continue
            else:
                content=line
                tag = Tag.objects.create(id = id, type = type, content = content)
                if type == 'Category':
                    clothes = Clothes.objects.create(owner_id=admin.id, image='wildcard.jpeg', is_wildcard=True)
                    clothes.tag.add(tag)
                id = id + 1
                


class Migration(migrations.Migration):
    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(db_initialize),
    ]
