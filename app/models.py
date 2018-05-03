from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

class Clothes(models.Model):
    owner = models.ForeignKey(
        'auth.User', related_name = 'clothes',
        on_delete=models.CASCADE, default = 1
    )
    created_time = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(default='media/default_image.jpeg')
    is_wildcard = models.BooleanField(default=False)
    tag = models.ManyToManyField('Tag')


class Tag(models.Model):
    content = models.CharField(max_length=100, default='')
    TYPE_CHOICES = (
        ('Color','Color'),('Season', 'Season'),
        ('Texture','Texture'), ('Category','Category')
    )
    type = models.CharField(max_length=100, choices=TYPE_CHOICES, default='Color')

    def __str__(self):
        return '{type}:{content}'.format(
            type=self.type, content=self.content
        )

class MxM(models.Model):
    created_time = models.DateTimeField(auto_now_add=True)
    comment = models.CharField(max_length=1000, default='')
    is_on_recommendation = models.BooleanField(default=False)
    is_on_evaluation = models.BooleanField(default=False)


class Reply(models.Model):
    created_time = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(
        'auth.User', related_name='replies',
        on_delete=models.CASCADE
    )
    reply_content = models.CharField(max_length=1000, default='')
    mxm = models.ForeignKey(
        'MxM', related_name='replies',
        on_delete=models.CASCADE
    )


class Rating(models.Model):
    created_time = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(
        'auth.User', related_name='ratings',
        on_delete=models.CASCADE
    )
    stars = models.IntegerField()
    mxm = models.ForeignKey(
        'MxM', related_name='ratings',
        on_delete=models.CASCADE
    )
