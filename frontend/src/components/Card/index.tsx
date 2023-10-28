
import {Container} from "./styles"
import axios from "axios";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';

type CardProps = {
    title:string;
    descripion:string;
    completed:boolean;
    tarefa_id:number;
    
}


export default function Card ({ title,descripion,completed,tarefa_id }:CardProps) {

    const handleCardClick = () => {
        const accessToken = localStorage.getItem('access_token');
        const config = {
            headers: {
              Authorization: `Bearer ${accessToken}` // Adicione o token de acesso ao cabeçalho
            }
          };
        axios.put(`http://127.0.0.1:8000/api/atualizar_tarefa/${tarefa_id}/`, null, config        )
          .then((response) => {
            window.location.href = '/'; 
            // Lida com a resposta do backend, se necessário
            // Por exemplo, você pode atualizar o estado do componente para refletir o novo status
            // ou exibir uma mensagem de sucesso
          })
          .catch((error) => {
            // Trata erros, se necessário
            console.error('Erro ao atualizar a tarefa:', error);
          });
      };

      const handleDeletClick = () => {
        const accessToken = localStorage.getItem('access_token');
        const config = {
            headers: {
              Authorization: `Bearer ${accessToken}` // Adicione o token de acesso ao cabeçalho
            }
          };
        axios.delete(`http://127.0.0.1:8000/api/excluir_tarefa/${tarefa_id}/`, config        )
          .then((response) => {
            window.location.href = '/'; 
            // Lida com a resposta do backend, se necessário
            // Por exemplo, você pode atualizar o estado do componente para refletir o novo status
            // ou exibir uma mensagem de sucesso
          })
          .catch((error) => {
            // Trata erros, se necessário
            console.error('Erro ao Deletar a tarefa', error);
          });
      };
    return (
        <Container completed={completed} >
        <div >
           <span>{title} </span>
           <p>{descripion}</p>
        </div>
        <div style={{marginRight:'20px'}}>
          {completed ? <ClearIcon onClick={handleCardClick} style={{ cursor: 'pointer', fontSize: '35px' }} /> : <CheckIcon onClick={handleCardClick} style={{ cursor: 'pointer', fontSize: '35px' }}/>  }
          <DeleteIcon style={{ cursor: 'pointer', fontSize: '35px' }} onClick={handleDeletClick}/>
        </div>
        </Container>
    )
}

