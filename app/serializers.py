from rest_framework import serializers
from django.contrib.auth import logout
from django.contrib.auth.models import User
from app.models import Clothes, Tag, MxM, Reply, Rating

class UserSerializer(serializers.ModelSerializer):
    mxms = serializers.PrimaryKeyRelatedField(
        many=True, queryset=MxM.objects.all()
    )
    clothes = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Clothes.objects.all()
    )
    class Meta:
        model = User
        fields = ('id','username','mxms','clothes')


class ClothesSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    tag = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Tag.objects.all()
    )
    class Meta:
        model = Clothes
        fields = ('id', 'created_time','image','is_wildcard','tag')


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('content', 'type')


class MxMSerializer(serializers.ModelSerializer):
    ratings = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Rating.objects.all()
    )
    replies = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Reply.objects.all()
    )

    class Meta:
        model = MxM
        fields = (
            'id', 'created_time', 'comment', 'ratings',
            'replies', 'is_on_recommendation', 'is_on_evaluation'
        )


class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        fields = ('id', 'created_time', 'author', 'reply_content', 'mxm')


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('id', 'created_time', 'author', 'stars', 'mxm')
