import {Container,
    Profile,
    Welcome,
    Username
} from './styles'

import Button from '@mui/material/Button';



export default function MainHeader () {
    const first_name = localStorage.getItem('first_name') || ''; // Usar uma string vazia como valor padrão se for null
    const username = first_name ? JSON.parse(first_name) : '';
    

    function handleLogout() {
        // Limpe qualquer informação de autenticação, por exemplo, token JWT, username, etc.
        localStorage.removeItem('access_token') // Exemplo: remova o nome de usuário do localStorage
        localStorage.removeItem('first_name')
        
        // Redirecione o usuário para a página de login ou outra página não autenticada
        // Exemplo de redirecionamento:
        window.location.href = '/'; // Redirecione para a página de login
      }
    return (
        <Container>
            <Profile>
                <Welcome >Olá,</Welcome>
                <Username>{username}</Username>
                <Button
          style={{ marginLeft: '10px' }}
          variant="contained"
          onClick={handleLogout}>SAIR</Button>
            </Profile>
        </Container>
    )
}
