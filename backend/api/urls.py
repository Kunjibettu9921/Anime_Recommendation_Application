from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AnimeViewSet
from django.http import HttpResponse

router = DefaultRouter()
router.register(r'anime', AnimeViewSet)

def home(request):
    return HttpResponse("Welcome to the backend!")

urlpatterns = [
    path('api/', include(router.urls)),
    path('', home, name='home'),
]