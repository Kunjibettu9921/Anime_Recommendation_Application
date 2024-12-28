from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from anime_app.models import Anime
from anime_app.serializers import AnimeSerializer

@api_view(['GET', 'POST', 'DELETE'])
def anime_list(request):
    if request.method == 'GET':
        # Retrieve all anime or filter by title
        anime_model = Anime.objects.all()
        title = request.GET.get('title', None)
        if title:
            anime_model = anime_model.filter(title__icontains=title)
        
        anime_serializer = AnimeSerializer(anime_model, many=True)
        return Response(anime_serializer.data)

    elif request.method == 'POST':
        # Create a new anime
        anime_data = request.data
        anime_serializer = AnimeSerializer(data=anime_data)
        if anime_serializer.is_valid():
            anime_serializer.save()
            return Response(anime_serializer.data, status=status.HTTP_201_CREATED)
        return Response(anime_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        # Delete all anime
        count, _ = Anime.objects.all().delete()
        return Response({'message': f'{count} anime were deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'DELETE'])
def anime_detail(request, pk):
    try:
        anime_model = Anime.objects.get(pk=pk)
    except Anime.DoesNotExist:
        return Response({'message': 'The anime does not exist.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        # Retrieve a single anime
        anime_serializer = AnimeSerializer(anime_model)
        return Response(anime_serializer.data)

    elif request.method == 'PUT':
        # Update a single anime
        anime_data = request.data
        anime_serializer = AnimeSerializer(anime_model, data=anime_data)
        if anime_serializer.is_valid():
            anime_serializer.save()
            return Response(anime_serializer.data)
        return Response(anime_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        # Delete a single anime
        anime_model.delete()
        return Response({'message': 'Anime was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def anime_list_published(request):
    # Retrieve all published anime
    anime_model = Anime.objects.filter(published=True)
    anime_serializer = AnimeSerializer(anime_model, many=True)
    return Response(anime_serializer.data)