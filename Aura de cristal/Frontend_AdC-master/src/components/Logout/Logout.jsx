// Logout.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    onLogout(); // Lógica de cierre de sesión
    navigate('/'); // Redirigir a la página de inicio de sesión después de cerrar sesión
  }, [onLogout, navigate]);

  return null; // No renderiza nada en la pantalla
};

export default Logout;
