from django.shortcuts import render, HttpResponse
from rest_framework import generics
from .models import Anime
from .serializers import AnimeSerializer

class AnimeListCreateView(generics.ListCreateAPIView):
    queryset = Anime.objects.all()
    serializer_class = AnimeSerializer


class AnimeRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Anime.objects.all()
    serializer_class = AnimeSerializer