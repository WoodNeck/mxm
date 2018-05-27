from app.models import Clothes, Tag, MxM, Reply, Rating
from app.serializers import (
    UserSerializer, ClothesSerializer, TagSerializer,
    MxMSerializer, ReplySerializer, RatingSerializer
)
from django.contrib.auth.models import User
from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import render
import app.constants as constants

def index(request):
    return render(request, 'index.html')


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


class ClothesDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Clothes.objects.all()
    serializer_class = ClothesSerializer


class ClothesOfUser(APIView):
    cpp = constants.clothes_per_page # number of clothes per page
    def get_all_clothes_of_user(self, userID):
	    return [clothes for clothes in Clothes.objects.all() 
            if clothes.owner.id == int(userID)]

    def get(self, request, userID, page, format=None): #page starts from 1
        page = int(page)
        clothes = self.get_all_clothes_of_user(userID)[(page-1)*self.cpp : page*self.cpp]
        serializer = ClothesSerializer(clothes, many=True)
        return Response(serializer.data)

    def post(self, request, userID, page, format=None):
        serializer = ClothesSerializer(data=request.data)
        if(serializer.is_valid()):
            serializer.save(owner=User.objects.get(pk=userID))
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)      


class ClothesOfMxM(APIView):
    def get(self, request, mxmID, format=None):
        mxm = MxM.objects.get(pk=mxmID)
        serializer = ClothesSerializer(mxm.clothes, many=True)
        return Response(serializer.data)


class TagList(generics.ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class MxMList(generics.ListCreateAPIView):
    queryset = MxM.objects.all()
    serializer_class = MxMSerializer


class MxMDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = MxM.objects.all()
    serializer_class = MxMSerializer


class MxMsOfUser(APIView):
    mpp = constants.mxms_per_page #number of mxms per page
    def get_all_mxms_of_user(self, userID):
        return [mxm for mxm in MxM.objects.all() 
             if mxm.owner.id == int(userID)]

    def get(self, request, userID, page, format=None):
        page = int(page)
        mxms = self.get_all_mxms_of_user(userID)[(page-1)*self.mpp : page*self.mpp]
        serializer = MxMSerializer(mxms, many=True)
        return Response(serializer.data)

    def post(self, request, userID, page, format=None):
        serializer = MxMSerializer(data=request.data)
        if(serializer.is_valid()):
            serializer.save(owner=User.objects.get(pk=userID))
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)      


class ReplyList(generics.ListCreateAPIView):
    queryset = Reply.objects.all()
    serializer_class = ReplySerializer


class ReplyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Reply.objects.all()
    serializer_class = ReplySerializer


class RepliesOfMxM(APIView):
    rpp = constants.replies_per_page # number of replies per page
    def get_all_replies_of_mxm(self, mxmID):
        return [reply for reply in Reply.objects.all() 
            if reply.mxm.id == int(mxmID)]

    def get(self, request, mxmID, page, format=None):
        page = int(page)
        replies = self.get_all_replies_of_mxm(mxmID)[(page-1)*self.rpp : page*self.rpp]
        serializer = ReplySerializer(replies, many=True)
        return Response(serializer.data)

    def post(self, request, mxmID, page, format=None):
        serializer = ReplySerializer(data=request.data)
        if(serializer.is_valid()):
            serializer.save(mxm=MxM.objects.get(pk=mxmID))
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)      


class RatingList(generics.ListCreateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer


class RatingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer


class RatingsOfMxM(APIView):
    rpp = constants.ratings_per_page # number of ratings per page
    def get_all_ratings_of_mxm(self, mxmID):
        return [rating for rating in Rating.objects.all() 
            if rating.mxm.id == int(mxmID)]

    def get(self, request, mxmID, page, format=None):
        page = int(page)
        ratings = self.get_all_ratings_of_mxm(mxmID)[(page-1)*self.rpp : page*self.rpp]
        serializer = RatingSerializer(ratings, many=True)
        return Response(serializer.data)

    def post(self, request, mxmID, page, format=None):
        serializer = RatingSerializer(data=request.data)
        if(serializer.is_valid()):
            serializer.save(mxm=MxM.objects.get(pk=mxmID))
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)      


