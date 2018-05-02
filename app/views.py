from app.models import MxM, Reply, Rating
from app.serializers import MxMSerializer, ReplySerializer, RatingSerializer
from rest_framework import generics


class MxMList(generics.ListAPIView):
    queryset = MxM.objects.all()
    serializer_class = MxMSerializer


class MxMDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = MxM.objects.all()
    serializer_class = MxMSerializer


class ReplyList(generics.ListAPIView):
    queryset = Reply.objects.all()
    serializer_class = ReplySerializer


class ReplyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Reply.objects.all()
    serializer_class = ReplySerializer


class RatingList(generics.ListAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer


class RatingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
