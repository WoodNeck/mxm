from app.models import Clothes, Tag, MxM, Reply, Rating
from app.serializers import (
    UserSerializer, ClothesSerializer, TagSerializer, 
    MxMSerializer, ReplySerializer, RatingSerializer
)
from django.contrib.auth.models import User
from rest_framework import generics
from django.shortcuts import render

def home(request):
    return render(request, 'home.html')


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ClothesList(generics.ListCreateAPIView):
    queryset = Clothes.objects.all()
    serializer_class = ClothesSerializer


class ClothesDetail(generics.RetrieveAPIView):
    queryset = Clothes.objects.all()
    serializer_class = ClothesSerializer


class TagList(generics.ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class MxMList(generics.ListCreateAPIView):
    queryset = MxM.objects.all()
    serializer_class = MxMSerializer


class MxMDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = MxM.objects.all()
    serializer_class = MxMSerializer


class ReplyList(generics.ListCreateAPIView):
    queryset = Reply.objects.all()
    serializer_class = ReplySerializer


class ReplyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Reply.objects.all()
    serializer_class = ReplySerializer


class RatingList(generics.CreateListAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer


class RatingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
