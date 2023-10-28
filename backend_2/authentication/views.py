from django.shortcuts import render

# Create your views here.
from django.contrib.auth import login, logout
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer
from .serializers import TaskSerializer  # Importe TaskSerializer
from .models import Task  # Importe o modelo Task da sua aplicação

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listar_tarefas(request):
    # Filtrar as tarefas pelo ID do usuário autenticado
    tarefas = Task.objects.filter(user=request.user)

    # Serializar as tarefas para retorná-las como JSON
    serializer = TaskSerializer(tarefas, many=True)

    return Response({'tarefas': serializer.data}, status=status.HTTP_200_OK)


@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.create_user(username=serializer.validated_data['email'], email=serializer.validated_data['email'], password=serializer.validated_data['password'],first_name=serializer.validated_data['first_name'])
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_view(request):
    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')
        user = User.objects.filter(email=email).first()

        if user is not None and user.check_password(password):
            first_name = user.first_name  # Use o campo 'first_name' para obter o nome de usuário
            id_user=user.id;
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            return Response({'access_token': access_token, 'first_name': first_name,'id_user':id_user}, status=status.HTTP_200_OK)
        return Response({'detail': 'Credenciais inválidas.'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return Response({'detail': 'Logout bem-sucedido!'}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Use a permissão IsAuthenticated para garantir que o usuário esteja autenticado
def create_task(request):
    if request.method == 'POST':
        serializer = TaskSerializer(data=request.data)

        if serializer.is_valid():
            # Crie a tarefa com base nos dados fornecidos e associe-a ao usuário atual
            title = serializer.validated_data['title']
            description = serializer.validated_data['description']
            completed = serializer.validated_data.get('completed', False)  # Defina como False se não for fornecido
            user = request.user  # Obtém o usuário autenticado

            # Crie a tarefa no banco de dados associando-a ao usuário atual
            task = Task.objects.create(title=title, description=description, completed=completed, user=user)

            # Serialize a tarefa para retornar na resposta
            serialized_task = TaskSerializer(task)

            return Response(serialized_task.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def atualizar_tarefa(request, task_id):
    try:
        tarefa = Task.objects.get(id=task_id)

        # Verifique se a tarefa pertence ao usuário autenticado
        if tarefa.user != request.user:
            return Response({'detail': 'Permissão negada'}, status=status.HTTP_403_FORBIDDEN)

        # Alterne o status da tarefa
        tarefa.completed = not tarefa.completed
        tarefa.save()

        serializer = TaskSerializer(tarefa)

        return Response(serializer.data, status=status.HTTP_200_OK)
    except Task.DoesNotExist:
        return Response({'detail': 'Tarefa não encontrada'}, status=status.HTTP_404_NOT_FOUND)

    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def excluir_tarefa(request, task_id):
    try:
        tarefa = Task.objects.get(id=task_id)

        # Verifique se a tarefa pertence ao usuário autenticado
        if tarefa.user != request.user:
            return Response({'detail': 'Permissão negada'}, status=status.HTTP_403_FORBIDDEN)

        tarefa.delete()
        return Response({'detail': 'Tarefa excluída com sucesso'}, status=status.HTTP_204_NO_CONTENT)
    except Task.DoesNotExist:
        return Response({'detail': 'Tarefa não encontrada'}, status=status.HTTP_404_NOT_FOUND)
