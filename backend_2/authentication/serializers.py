from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Task

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password','first_name')  # Certifique-se de incluir 'password'

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id','title', 'description', 'completed')

