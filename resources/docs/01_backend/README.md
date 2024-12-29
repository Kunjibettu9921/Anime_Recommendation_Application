# <img src="../../images/django-icon.png" width=30> 1. Backend Setup

## ✨ 1. Django Backend Setup

### 1.1 Setup `requirements.txt` file

* Easy one time installation

```bash
# 'backend/requirements.txt'
asgiref==3.7.2
Django==5.0.1
django-cors-headers
djangorestframework
pytz==2024.1
```

* `$ pip install -r requirements.txt`

### 1.2 Create a Django project + Django app

```bash
$ django-admin startproject backend
$ cd backend
$ python manage.py startapp anime
```

### 1.3 Model definition

1. Inside the `anime` app which was previously created, edit the already existing `models.py` file with the following code:

```python
# 'backend/anime/models.py'
# auto generate file

from django.db import models

# Create your models here.
class Anime(models.Model):
    name = models.CharField(max_length=200)
    rating = models.FloatField()

    def __str__(self):
        return self.name
```

### 1.4 Run Migrations

```bash
$ python manage.py makemigrations
$ python manage.py migrate
```

* This generates a `db.sqlite3.db` in the `backend/` directory.
* This will act as the backend database file 

## ✨ 2. Implement Django REST Framework `DRF`

### 2.1 Update the `settings.py` file:

```python
# 'backend/backend/settings.py'
# auto generate file
...

ALLOWED_HOSTS = []

CORS_ALLOW_ALL_ORIGINS = True

CORS_ALLOW_METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]

# Application definition

INSTALLED_APPS = [
    ... # keep the apps above, do not delete them
    'corsheaders', # Cross Origin Requests
    'rest_framework', # django rest framework
    'anime', # app created from startapp
]

MIDDLEWARE = [
    ... # keep the middleware above, do not delete them
    'corsheaders.middleware.CorsMiddleware', # Cross Origin Requests
    "django.middleware.common.CommonMiddleware",
    ... # keep the middleware below, do not delete them
]

...

TEMPLATES = [
    {
        ...
        "DIRS": [BASE_DIR / 'templates'],
        ...
    },
]

...

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

```

### 2.2 Create Serializers

```python
# 'backend/anime/serializers.py'
# You will have to create a new file for this

from rest_framework import serializers
from .models import Anime

class AnimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Anime
        fields = '__all__'
```

### 2.3 Create API Views

```python
# 'backend/anime/views.py'
# You will have to create a new file for this

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
```

### 2.4 Create app urls

```python
# 'backend/anime/urls.py'
# You will have to create a new file for this

from django.urls import path
from .views import AnimeListCreateView, AnimeRetrieveUpdateDestroyView

urlpatterns = [
    path('anime/', AnimeListCreateView.as_view(), name='anime-list-create'),
    path('anime/<int:pk>/', AnimeRetrieveUpdateDestroyView.as_view(), name='anime-retrieve-update-destroy'),
]
```

### 2.5 Configure project urls

```python
# 'backend/backend/urls.py'
# auto generate file
...
urlpatterns = [
    path("admin/", admin.site.urls),
    path("",include("anime.urls")) # Add this step, anime is the app name and urls is the REST API urls we created
]
```