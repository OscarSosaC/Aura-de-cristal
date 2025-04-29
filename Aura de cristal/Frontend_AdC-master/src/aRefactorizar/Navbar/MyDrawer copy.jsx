import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItemText,
  ListItemButton,
  ListItem,
  IconButton,
  Collapse,
  ListItemIcon,
  Divider,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PhoneIcon from '@mui/icons-material/Phone';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { Link, useNavigate } from 'react-router-dom';

const MyDrawer = ({ isAuthenticated, isAdmin, onLogout }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openCatalogo, setOpenCatalogo] = useState(false);
  const [openTematica, setOpenTematica] = useState(false);

  const navigate = useNavigate();

  const handleLogoutAndClose = () => {
    onLogout();
    setOpenDrawer(false);
    navigate('/');
  };

  const handleClickCatalogo = () => {
    setOpenCatalogo(!openCatalogo);
  };

  const handleClickTematica = () => {
    setOpenTematica(!openTematica);
  };

  return (
    <>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          {/* Catálogo */}
          <ListItem disablePadding>
            <ImportContactsIcon />
            <ListItemButton onClick={handleClickCatalogo}>
              <ListItemText>Catálogo</ListItemText>
              {openCatalogo ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={openCatalogo} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link
                onClick={() => setOpenDrawer(false)}
                style={{ color: 'inherit', textDecoration: 'none' }}
                to="/listaProductos/1"
              >
                <ListItemButton sx={{ pl: 6 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Vajilla" />
                </ListItemButton>
              </Link>
              <Link
                onClick={() => setOpenDrawer(false)}
                style={{ color: 'inherit', textDecoration: 'none' }}
                to="/listaProductos/2"
              >
                <ListItemButton sx={{ pl: 6 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Cubiertos" />
                </ListItemButton>
              </Link>
              <Link
                onClick={() => setOpenDrawer(false)}
                style={{ color: 'inherit', textDecoration: 'none' }}
                to="/listaProductos/3"
              >
                <ListItemButton sx={{ pl: 6 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Cristalería" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>

          {/* Temáticas */}
          <ListItem disablePadding>
            <CelebrationIcon />
            <ListItemButton onClick={handleClickTematica}>
              <ListItemText>Temáticas</ListItemText>
              {openTematica ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={openTematica} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 6 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Halloween" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 6 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Navidad" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 6 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Acción de Gracias" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Otros enlaces */}
          <Link
            style={{ color: 'inherit', textDecoration: 'none' }}
            to="/wip"
            onClick={() => setOpenDrawer(false)}
          >
            <ListItem disablePadding>
              <WorkspacePremiumIcon />
              <ListItemButton>
                <ListItemText>Premium set</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
          <Link
            style={{ color: 'inherit', textDecoration: 'none' }}
            to="/wip"
            onClick={() => setOpenDrawer(false)}
          >
            <ListItem disablePadding>
              <PhoneIcon />
              <ListItemButton>
                <ListItemText>Contáctanos</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider />
          <Link
            style={{ color: 'inherit', textDecoration: 'none' }}
            to="/wip"
            onClick={() => setOpenDrawer(false)}
          >
            <ListItem disablePadding>
              <ShoppingCartIcon />
              <ListItemButton>
                <ListItemText>Comprar</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider />

          {/* Opciones de sesión */}
          {isAuthenticated ? (
            <>
              {/* Perfil */}
              <Link
                style={{ color: 'inherit', textDecoration: 'none' }}
                to="/profile"
                onClick={() => setOpenDrawer(false)}
              >
                <ListItem disablePadding>
                  <PersonIcon />
                  <ListItemButton>
                    <ListItemText>Perfil</ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>

              {
                isAdmin ? 
                  <React.Fragment>
                    {/* Panel Admin */}
                    <Link
                      style={{ color: 'inherit', textDecoration: 'none' }}
                      to="/admin"
                      onClick={() => setOpenDrawer(false)}
                    >
                      <ListItem disablePadding>
                        <PersonIcon />
                        <ListItemButton>
                          <ListItemText>Panel Admin</ListItemText>
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  </React.Fragment>                          
                          :
                  <React.Fragment></React.Fragment>
              }                                      

              {/* Cerrar sesión */}
              <ListItem disablePadding>
                <MailIcon />
                <ListItemButton onClick={handleLogoutAndClose}>
                  <ListItemText>Cerrar Sesión</ListItemText>
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            <>
              {/* Iniciar sesión */}
              <Link
                style={{ color: 'inherit', textDecoration: 'none' }}
                to="/login"
                onClick={() => setOpenDrawer(false)}
              >
                <ListItem disablePadding>
                  <MailIcon />
                  <ListItemButton>
                    <ListItemText>Iniciar Sesión</ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>

              {/* Registrarse */}
              <Link
                style={{ color: 'inherit', textDecoration: 'none' }}
                to="/register"
                onClick={() => setOpenDrawer(false)}
              >
                <ListItem disablePadding>
                  <PersonIcon />
                  <ListItemButton>
                    <ListItemText>Regístrate</ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>
            </>
          )}
        </List>
      </Drawer>

      {/* Botón para abrir Drawer */}
      <IconButton
        sx={{ color: '#623d2b', marginLeft: 'auto' }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default MyDrawer;
