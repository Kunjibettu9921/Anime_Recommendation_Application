from django.urls import path
from .views import AnimeListCreateView, AnimeRetrieveUpdateDestroyView

urlpatterns = [
    path('anime/', AnimeListCreateView.as_view(), name='anime-list-create'),
    path('anime/<int:pk>/', AnimeRetrieveUpdateDestroyView.as_view(), name='anime-retrieve-update-destroy'),
]