from django.db import models

# Create your models here.
class Anime(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    release_year = models.IntegerField()

    def __str__(self):
        return self.name