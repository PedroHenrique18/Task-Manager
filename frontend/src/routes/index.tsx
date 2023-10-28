import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Auth from './auth.routes';
import App from './app.routes';

const Routes: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<boolean | undefined>();

  // Verifique a presença do token JWT no localStorage
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      // Token JWT encontrado, o usuário está autenticado
      setCurrentUser(true);
    } else {
      // Token JWT não encontrado, o usuário não está autenticado
      setCurrentUser(false);
    }
  }, []);

  return (
    <BrowserRouter>
      {currentUser ? <App /> : <Auth />}
    </BrowserRouter>
  );
}

export default Routes;
