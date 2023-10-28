import React, {useState,useEffect} from 'react';
import axios from 'axios'; // Importe a biblioteca axios

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import Input from '../../components/Input';
import Button from '../../components/Button';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
  });
  

import {
    Container,
    Logo,
    Form,
    FormTitle,
} from './styles'

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

const SignIn: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [regis_email, setRegis_emaill] = useState<string>('');
    const [regis_password, setRegis_password] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    function submitLogin(e: React.FormEvent) {
      e.preventDefault();
      client
        .post('/api/login/', {
          email: email,
          password: password,
        })
        .then(function (res) {
          const { access_token, first_name } = res.data;
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('first_name', JSON.stringify(first_name));

          // Redirecione o usuário ou atualize o estado do aplicativo, conforme necessário
          window.location.href = '/'; 
        })
        .catch(function (error) {
          // Trate os erros de login aqui
          console.error('Erro de login:', error);
        });
    }

    function submitSignup(e: React.FormEvent) {
      e.preventDefault();
      client
        .post('/api/register/', {
          email: regis_email,
          password: regis_password,
          first_name: firstName,
          username: username,
        })
        .then(function (res) {
          // Trate o sucesso do cadastro aqui
          setSuccess('Cadastro realizado com sucesso');
          setShowSuccessModal(true);
          // Você pode redirecionar o usuário ou fazer outras ações necessárias aqui
        })
        .catch(function (error) {
          // Trate os erros de cadastro aqui
          if (error.response && error.response.status === 400) {
            setError('Email ou usuário já cadastrado');
          } else {
            setError('Erro de cadastro');
          }
        });
    }

    
      

    return (
        <Container>
            <Logo>
                <h2>Task Manager</h2>
            </Logo>
            <Form onSubmit={e => submitLogin(e)}>
                <FormTitle>Entrar</FormTitle>
                <Input 
                    type='email'
                    placeholder='email'
                    required
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                />
                <Input 
                    type='password'
                    placeholder='senha'
                    required
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                />

                <Button type="submit" >Acessar</Button>

                <Button style={{backgroundColor:'white'}}onClick={handleOpen}>Cadastre-se</Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  
                  
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      Cadastr-se
                    </Typography>
                      {success ? (
                          <p>{success}</p>
                      ) : (
                      <form onSubmit={submitSignup}>
                        <Input
                          type="text"
                          placeholder="Primeiro Nome"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                        <Input
                          type="text"
                          placeholder="Nome de Usuário"
                          required
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input
                          type="email"
                          placeholder="Email"
                          required
                          value={regis_email}
                          onChange={(e) => setRegis_emaill(e.target.value)}
                        />
                        <Input
                          type="password"
                          placeholder="Senha"
                          required
                          value={regis_password}
                          onChange={(e) => setRegis_password(e.target.value)}
                        />
                        <Button style={{ backgroundColor: 'blue', color: 'white' }} type="submit">
                          Cadastre-se
                        </Button>
                      </form>
                      )}
                  </Box>
                </Modal>
            </Form>
        </Container>
    );
}


export default SignIn;