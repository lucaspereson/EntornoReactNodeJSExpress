import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import BasicAlert from '../components/BasicAlert';

export default function AddUsers() {
  const roles = [
    {
      value: 'Profesor',
      label: 'Profesor',
    },
    {
      value: 'Administrador',
      label: 'Administrador',
    }
  ];
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
      });
      if (!response.ok) {
          const errorData = await response.json(); // Intenta obtener más detalles del error del cuerpo de la respuesta
          throw new Error(errorData.message || 'Fallo en el registro');
      }
      const result = await response.text();
      console.log(result);
      showBasicAlert('success', 'Login completado correctamente: Redirigiendo...');      
    } catch (error) {
        showBasicAlert('error', `El registro del nuevo usuario falló`);
        console.log('error.message');
        console.log(error.message);
    }
  };

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ severity: '', message: '' });

  const handleAlertClose = () => {
      setAlertOpen(false);
  };

  const showBasicAlert = (severity, message) => {
      setAlertInfo({ severity, message });
      setAlertOpen(true);
  };
  
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: '1%', width: '48%' }, // Ajusta el margen y el ancho para que quepan dos por fila
        display: 'flex',  // Habilita flexbox
        flexWrap: 'wrap', // Permite el salto de línea
        justifyContent:'space-between', // Justifica el contenido de manera uniforme
        alignItems: 'center' // Centra los elementos verticalmente
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        required
        id="name"
        label="Nombre"
        type='text'
      />
      <TextField
        required
        id="lastname"
        label="Apellido"
        type='text'
      />
        <TextField
        required
        id="email"
        label="Email"
        type='email'
      />
        <TextField
        required
        id="username"
        label="Nombre de usuario"
        type='text'
        value={username} onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        required
        id="password"
        label="Contraseña"
        type="password"
        value={password} onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        required
        id="confirm-password"
        label="Confirmar contraseña"
        type="password"
      />
      <TextField
        required
        id="roles"
        select
        defaultValue=''
        label="Seleccione un rol"
        variant="outlined"
        SelectProps={{
          sx: { textAlign: 'left' },
          MenuProps: {
            sx: { textAlign: 'left' }
          }
        }}
      >
        {roles.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    
    <Box sx={{ width: '100%', height: 0 }}>
      <Button variant="contained" type="submit" sx={{ mt:3, width: '30vh', alignSelf: 'center', bgcolor: '#007FFF', '&:hover': {bgcolor: 'blue', }}}>
          Agregar Usuario
      </Button>
    </Box>
    <BasicAlert
              open={alertOpen}
              handleClose={handleAlertClose}
              severity={alertInfo.severity}
              message={alertInfo.message}
          />
    </Box>
  );
}
