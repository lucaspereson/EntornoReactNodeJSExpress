import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext'; // Asegúrate de que la ruta sea correcta
import BasicAlert from '../components/BasicAlert'; // Para alertas

const settings = ['Sesión',['Perfil', 'Cuenta']];
const pagesProfesor = [['Home', ['Home']], ['Heramientas', ['Herramientas']], ['Grupos', ['Armar equipos', 'Modificar equipos', 'Eliminar equipos', 'Ruta de aprendizaje']], ['Reportes', ['Reportes']]];
const pagesAdmin = [['Home', ['HomeAdmin']], ['Usuarios', ['Agregar usuario', 'Gestionar usuarios']], ['Modulos', ['Modulos']]];

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [menuStates, setMenuStates] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ severity: '', message: '' });
  let pages = []
  const pagesDefinition = () => {
    const role = localStorage.getItem('role');
    if (role && role === 'profesor') {
      pages = pagesProfesor;
    } else if (role && role === 'admin') {
      pages = pagesAdmin;
    }
  }
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (page) => (event) => {
    setMenuStates({...menuStates, [page]: event.currentTarget});
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (page) => () => {
    setMenuStates({...menuStates, [page]: null});
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const showBasicAlert = (severity, message) => {
      setAlertInfo({ severity, message });
      setAlertOpen(true);
  };

  const handleLogout = () => {
      showBasicAlert('success', 'Sesión cerrada exitosamente. Redirigiendo...');
      setTimeout(() => {
        localStorage.removeItem('user');
        setUser(null);
        navigate("/login");
      }, 3000); // Retraso antes de redirigir para mostrar alerta
      handleCloseUserMenu(); // Cierra el menú de usuario
  };

  return (
    <AppBar position="fixed" sx={{zIndex: 10000}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ADE TOOLKIT
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu} to={page[1]}>
                  <Typography textAlign="center">{page[0]}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ADE TOOLKIT
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pagesDefinition()}
            {pages.map((page) => (
            <Box key={page[0]} sx={{ flexGrow: 0 }}>
                <Tooltip title="Abrir configuración">
                    <Button onClick={handleOpenUserMenu(page[0])} sx={{ p: 0 }}>
                        <Typography sx={{color: 'white', margin: 2}}>
                             {page[0]}
                        </Typography>
                    </Button>
                </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={menuStates[page[0]]}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(menuStates[page[0]])}
                onClose={handleCloseUserMenu(page[0])}
                >
                    {page[1].map((option) => (
                    <MenuItem key={option} onClick={handleCloseUserMenu(page[0])} component={Link} to={`/${option.replace(/\s+/g, '-').toLowerCase()}`}>
                        <Typography textAlign="center">{option}</Typography>
                    </MenuItem>
                    ))}
                </Menu>
            </Box>
            ))}
          </Box>
        

          <Box key={settings[0]} sx={{ flexGrow: 0 }}>
            <Tooltip title="Abrir configuración">
              <IconButton onClick={handleOpenUserMenu(settings[0])} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI2ZQuBchNYHw1SPS4KSSBT9UQ92eJ70Tt159r5EDdgw&s" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={menuStates[settings[0]]}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(menuStates[settings[0]])}
              onClose={handleCloseUserMenu(settings[0])}
            >
              {settings[1].map((setting) => (
                <MenuItem key={settings[0]} onClick={handleCloseUserMenu(settings[0])} component={Link} to={`/${setting.replace(/\s+/g, '-').toLowerCase()}`}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
                <MenuItem key={'Cerrar sesión'} onClick={handleLogout} sx={{'&:hover': {backgroundColor:'#ffbaba'}}}>
                  <Typography textAlign="center" >{'Cerrar sesión'}</Typography>
                </MenuItem>
              
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <BasicAlert
          open={alertOpen}
          handleClose={handleAlertClose}
          severity={alertInfo.severity}
          message={alertInfo.message}
            />
    </AppBar>
  );
}
export default ResponsiveAppBar;
