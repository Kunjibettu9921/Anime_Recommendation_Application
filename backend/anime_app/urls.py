from django.urls import path
from anime_app.views import anime_list, anime_detail, anime_list_published

urlpatterns = [
    path('anime/', anime_list, name='anime_list'),
    path('anime/<int:pk>/', anime_detail, name='anime_detail'),
    path('anime/published/', anime_list_published, name='anime_list_published'),
]