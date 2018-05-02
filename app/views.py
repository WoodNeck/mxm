from app.models import MxM, Reply, Rating
from app.serializers import MxMSerializer, ReplySerializer, RatingSerializer
from django.http import Http404, HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from django.shortcuts import render

def home(request):
	return render(request, 'home.html')

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
