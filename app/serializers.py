from rest_framework import serializers
from django.contrib.auth import logout
from django.contrib.auth.models import User
from app.models import Clothes, Tag, MxM, Reply, Rating

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username')


class ClothesSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    tag = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Tag.objects.all()
    )
    class Meta:
        model = Clothes
        fields = ('id', 'owner', 'created_time','image','is_wildcard','tag')


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'content', 'type')


class MxMReadSerializer(serializers.ModelSerializer):
    average_rating = serializers.SerializerMethodField()
    num_replies = serializers.SerializerMethodField()
    clothes = ClothesSerializer(many=True)

    def get_average_rating(self, obj):
        result = 0
        count = 0
        for rating in obj.ratings.all():
            result += rating.stars
            count += 1
        if(count == 0):
            return 0
        return float(result) / float(count)

    def get_num_replies(self, obj):
        return len(obj.replies.all())

    class Meta:
        model = MxM
        fields = (
            'id', 'owner', 'created_time', 'clothes', 'description',
            'clothes_layout', 'is_on_recommendation', 'is_on_evaluation',
            'average_rating', 'num_replies'
        )


class MxMSerializer(serializers.ModelSerializer):
    class Meta:
        model = MxM
        fields = (
            'id', 'owner', 'created_time', 'clothes', 'description',
            'clothes_layout', 'is_on_recommendation', 'is_on_evaluation'
        )


class ReplyReadSerializer(serializers.ModelSerializer):
    recommend_clothes = ClothesSerializer(many=True)
    class Meta:
        model = Reply
        fields = ('id', 'created_time', 'author', 'reply_content', 'recommend_clothes', 'mxm')


class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        fields = ('id', 'created_time', 'author', 'reply_content', 'recommend_clothes', 'mxm')


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('id', 'created_time', 'author', 'stars', 'comment', 'mxm')
