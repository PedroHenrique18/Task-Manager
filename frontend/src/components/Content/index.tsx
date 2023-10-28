import { useState, useEffect } from 'react';
import { Container, Filters } from './styles';
import Card from '../Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import {
  Logo,
  Form,
  FormTitle,
} from '../../pages/SignIn/styles';

import Input from '../../components/Input';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface Task {
  id:number;
  title: string;
  description: string;
  completed: boolean;
}

export default function Content() {
  const [selectedStage, setSelectedStage] = useState([true, false]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleStageClick = (stage: boolean) => {
    const alreadySelected = selectedStage.findIndex((item) => item === stage);
    if (alreadySelected >= 0) {
      const filtered = selectedStage.filter((item) => item !== stage);
      setSelectedStage(filtered);
    } else {
      setSelectedStage((prev) => [...prev, stage]);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token'); // Substitua pelo token real que você obteve e armazenou.

    fetch('http://127.0.0.1:8000/api/listar_tarefas/', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
    .then((response) => {
        if (response.status === 401) {
            // Tratar o erro 401 aqui, por exemplo, redirecionando o usuário para a página de login.
            localStorage.removeItem('access_token') // Exemplo: remova o nome de usuário do localStorage
            localStorage.removeItem('first_name')
            window.location.href = '/'; 
            // Aqui você pode redirecionar o usuário para a página de login ou executar outra ação apropriada.
        } else if (response.ok) {
            return response.json();
        } else {
            throw new Error('Erro na solicitação');
        }
    })
    .then((data) => {
        setTasks(data.tarefas);
    })
    .catch((error) => {
        console.error('Erro ao buscar tarefas:', error);
        // Se o erro não for 401, você pode tratar de outra forma ou exibir uma mensagem de erro adequada.
    });
}, []);

  

  const filteredTasks = tasks.filter((task) =>
    selectedStage.includes(task.completed)
  );

  const handleCreateTask = () => {
    // Aqui você pode enviar os dados da tarefa para o servidor (Django)
    const newTask = {
      title: title,
      description: description,
      completed: false, // A tarefa é criada como não concluída
    };
    const token = localStorage.getItem('access_token')

    // Substitua a URL pela rota correta de criação de tarefas no Django
    fetch('http://127.0.0.1:8000/api/create_task/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        // Atualize o estado das tarefas com a nova tarefa
        setTasks([...tasks, data]);
        window.location.href = '/'; 
        handleClose(); // Feche o modal após a criação
      })
      .catch((error) => {
        console.error('Erro ao criar tarefa:', error);
      });
  };

  return (
    <Container>
      <Filters>
        <button
          type="button"
          className={`tag-filter tag-filter-concluido ${
            selectedStage.includes(true) && 'tag-actived'
          }`}
          onClick={() => handleStageClick(true)}
        >
          Concluída
        </button>
        <button
          type="button"
          className={`tag-filter tag-filter-incompleta ${
            selectedStage.includes(false) && 'tag-actived'
          }`}
          onClick={() => handleStageClick(false)}
        >
          Incompleta
        </button>
      </Filters>
      <Button onClick={handleOpen}>Criar Tarefa</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Crie sua tarefa
          </Typography>
          <Form
            onSubmit={(e) => {
              e.preventDefault(); // Evite o envio padrão do formulário
              handleCreateTask(); // Chame a função para criar a tarefa
            }}
          >
            <Input
              type="text"
              placeholder="Título"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Descrição"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button type="submit">Criar Tarefa</button>
          </Form>
        </Box>
      </Modal>
      {filteredTasks.map((task, index) => (
        <Card key={index} title={task.title} descripion={task.description} completed={task.completed} tarefa_id={task.id} />
      ))}
    </Container>
  );
}
