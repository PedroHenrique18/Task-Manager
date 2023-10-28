from django.urls import path
from .views import register, login_view, logout_view,create_task,listar_tarefas,atualizar_tarefa,excluir_tarefa

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('create_task/', create_task, name='create_task'),
    path('listar_tarefas/', listar_tarefas, name='listar_tarefas'),
    path('atualizar_tarefa/<int:task_id>/', atualizar_tarefa, name='atualizar_tarefa'),
    path('excluir_tarefa/<int:task_id>/', excluir_tarefa, name='excluir_tarefa'),

]
