from django.db import models
from django.contrib.auth.models import User  # Importe o modelo de usuário do Django (ou o modelo de usuário personalizado, se aplicável)
# Create your models here.

class Task(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title