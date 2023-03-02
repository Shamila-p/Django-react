from django.db import models
from django.contrib.auth.models import AbstractUser


class UserAccount(AbstractUser):
    image = models.ImageField(upload_to="images",default="default.jpg")

    def __str__(self):
        return self.username
