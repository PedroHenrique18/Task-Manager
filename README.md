# Task Manager with User Authentication

This is a task manager project with user authentication, built with Django Rest Framework (DRF) on the backend and React with TypeScript on the frontend. The project allows users to register their accounts, login, create tasks, update, and delete tasks.

# Features
- User Authentication: Register, login, and logout from your account.
- Task Management: Create, read, update, and delete tasks.
- User-Friendly Interface
  
<img src="https://github.com/PedroHenrique18/Gerenciador-de-Tarefas/blob/main/2023-10-28-20-24-06.gif">

# Prerequisites
- Python and Django
- MySQL
- Node.js
- Yarn (or npm)

# Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/PedroHenrique18/Gerenciador-de-Tarefas.git
```

### 2. Virtual Environment (Optional)
It is recommended to create a virtual environment to isolate the project's dependencies. If you don't have virtual environment installed, install it using the following command:

```bash
python -m venv venv
```
### 3. Install Python Dependencies
Install Python Dependencies, go to the backend_2 folder

```bash
pip install -r requirements.txt
```

### 4. Database Configuration

MySQL

1. Create a database in MySQL.

2. Configure the environment variables for the database connection in the settings.py file

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

3. Apply migrations:

```bash
python manage.py migrate
```
### 5. FrontEnd

Go to the frontend folder to install project dependencies

```bash
npm install
```
### 6. Running the Project

Now that the environment is set up, you can run the project:

1. Start the Django server in the backend_2 folder:

```bash
python manage.py runserver
```

2. Start the React application (from the "frontend" folder):

```bash
yarn dev
```

The project should now be running. Open a browser and access the local URL indicated by the terminal localhost http://localhost:5173/

