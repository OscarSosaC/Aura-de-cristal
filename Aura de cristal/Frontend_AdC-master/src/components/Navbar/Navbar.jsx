// Navbar.jsx
import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import MyDrawer from './MyDrawer';
import logo from '../../../public/images/Logo.png';
import { FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isAuthenticated, isAdmin, onLogout }) => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  // Estado para las iniciales del usuario
  const [userInitials, setUserInitials] = useState('');

  useEffect(() => {
      if (isAuthenticated) {
          const initials = localStorage.getItem('userInitials');
          setUserInitials(initials || '');
      } else {
          setUserInitials('');
      }
  }, [isAuthenticated]);

  // Estado y manejadores para el menú de Catálogo
  const [anchorElCatalogo, setAnchorElCatalogo] = React.useState(null);
  const openCatalogo = Boolean(anchorElCatalogo);
  const handleClickCatalogo = (event) => {
    setAnchorElCatalogo(event.currentTarget);
  };
  const handleCloseCatalogo = () => {
    setAnchorElCatalogo(null);
  };

  // Estado y manejadores para el menú de Usuario
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const openUser = Boolean(anchorElUser);
  const handleClickUser = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUser = () => {
    setAnchorElUser(null);
  };

  // Función para cerrar sesión y redirigir al inicio de sesión
  const handleLogoutAndRedirect = () => {
    onLogout();
    navigate('/'); // Redirige a la página de inicio de sesión después de cerrar sesión
  };

  return (
    <React.Fragment>
      <AppBar position="fixed">
        <div className="nav-contain">
          <Toolbar
            sx={{
              height: '90px',
              backgroundColor: '#ebe9e9',
              display: 'flex',
              justifyContent: 'space-evenly',
            }}
          >
            {/* Logo */}
            <Link to="/">
              <img src={logo} width={90} height={80} alt="Logo-icon" />
            </Link>

            {/* Slogan */}
            <Typography
              sx={{
                fontSize: '0.9rem',
                fontWeight: '250',
                fontStyle: 'italic',
                color: '#623d2b',
                fontFamily: 'Kaushan Script',
              }}
            >
              Tus recuerdos <br /> en porcelana
            </Typography>

            {isMatch ? (
              // Drawer para dispositivos móviles
              <MyDrawer isAuthenticated={isAuthenticated} isAdmin={isAdmin} onLogout={onLogout} />
            ) : (
              // Menú completo para pantallas grandes
              <>
                {/* Catálogo */}
                <Button
                  aria-controls={openCatalogo ? 'menu-catalogo' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openCatalogo ? 'true' : undefined}
                  onClick={handleClickCatalogo}
                  style={{ color: '#623d2b', paddingLeft: '5%' }}
                >
                  Catálogo
                </Button>
                <Menu
                  id="menu-catalogo"
                  anchorEl={anchorElCatalogo}
                  open={openCatalogo}
                  onClose={handleCloseCatalogo}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/listaCategorias/1">
                    <MenuItem onClick={handleCloseCatalogo}>Vajilla</MenuItem>
                  </Link>
                  <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/listaCategorias/2">
                    <MenuItem onClick={handleCloseCatalogo}>Cubiertos</MenuItem>
                  </Link>
                  <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/listaCategorias/3">
                    <MenuItem onClick={handleCloseCatalogo}>Cristalería</MenuItem>
                  </Link>
                </Menu>

                {/* Opciones de usuario */}
                <div className="right-side">
                  {isAuthenticated ? (
                    <>
                      <Button
                        aria-controls={openUser ? 'menu-user' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openUser ? 'true' : undefined}
                        onClick={handleClickUser}
                        style={{ color: '#623d2b', paddingLeft: '1%' }}
                      >
                        {userInitials ? (
                          <div className="user-initials">{userInitials}</div>
                        ) : (
                          <FaUser size={30} color="#655e5e" />
                        )}
                      </Button>
                      <Menu
                        id="menu-user"
                        anchorEl={anchorElUser}
                        open={openUser}
                        onClose={handleCloseUser}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                      >
                        <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/profile">
                          <MenuItem onClick={handleCloseUser}>Perfil</MenuItem>
                        </Link>
                        {isAdmin ? (
                          <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/admin">
                            <MenuItem onClick={handleCloseUser}>Panel Admin</MenuItem>
                          </Link>
                        ) : null}
                        <MenuItem onClick={handleLogoutAndRedirect}>Cerrar Sesión</MenuItem>
                      </Menu>
                    </>
                  ) : (
                    <>
                      <Button
                        aria-controls={openUser ? 'menu-user' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openUser ? 'true' : undefined}
                        onClick={handleClickUser}
                        style={{ color: '#623d2b', paddingLeft: '1%' }}
                      >
                        <FaUser size={30} color="#655e5e" />
                      </Button>
                      <Menu
                        id="menu-user"
                        anchorEl={anchorElUser}
                        open={openUser}
                        onClose={handleCloseUser}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                      >
                        <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/login">
                          <MenuItem onClick={handleCloseUser}>Iniciar Sesión</MenuItem>
                        </Link>
                        <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/register">
                          <MenuItem onClick={handleCloseUser}>Regístrate</MenuItem>
                        </Link>
                      </Menu>
                    </>
                  )}
                </div>
              </>
            )}
          </Toolbar>
        </div>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;