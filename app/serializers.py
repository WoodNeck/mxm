from rest_framework import serializers
from app.models import MxM, Reply, Rating


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
