# Gerenciador de Tarefas com Autenticação de Usuário

Este é um projeto de gerenciador de tarefas com autenticação de usuário, construído com Django Rest Framework (DRF) no back-end e React com TypeScript no front-end. O projeto permite que os usuários registrem suas contas, façam login, criem tarefas, atualize e delete tarefas

# Funcionalidades
- Autenticação de usuário: Registre-se, faça login e faça logout de sua conta.
- Gerenciamento de Tarefas: Crie, leia, atualize e delete tarefas.
- Interface de Usuário Amigável
- 
<img src="https://github.com/PedroHenrique18/Gerenciador-de-Tarefas/blob/main/2023-10-28-20-24-06.gif">

# Pré-requisitos
- Python e Django
- MySQL
- Node.js
- Yarn (ou npm)

# Configuração do Ambiente

### 1. Clone o Repositório

```bash
git clone https://github.com/PedroHenrique18/Gerenciador-de-Tarefas.git
```

### 2. Ambiente Virtual (Opcional)

Recomenda-se criar um ambiente virtual para isolar as dependências do projeto. Se você não tem o ambiente virtual instalado, instale-o usando o seguinte comando:

```bash
python -m venv venv
```
### 2. Ambiente Virtual (Opcional)

Instale as Dependências do Python, entre na pasta backend_2

```bash
pip install -r requirements.txt
```

### 4. Configuração do Banco de Dados

MySQL

1.Crie um banco de dados no MySQL.

2.Configure as variáveis de ambiente para a conexão com o banco de dados no arquivo em settings.py

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'nome-do-banco-de-dados',
        'USER': 'seu-usuario',
        'PASSWORD': 'sua-senha',
        'HOST': 'localhost',
        'PORT': '',
    }
}
```

3.Aplique as migrações:

```bash
python manage.py migrate
```
### 5. FrontEnd

Entre na pasta frontend para instalar as dependências do projeto

```bash
npm install
```
### 6. Executando o Projeto

Agora que o ambiente está configurado, você pode executar o projeto:

1.Inicie o servidor Django na pasta backend_2 execute:

```bash
python manage.py runserver
```

2. Inicie o aplicativo React (a partir da pasta "frontend"):

```bash
yarn dev
```

O projeto agora deve estar em execução. Abra um navegador e acesse o URL local indicado pelo terminal localhost http://localhost:5173/

