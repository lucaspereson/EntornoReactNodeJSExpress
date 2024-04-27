import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import BasicAlert from '../components/BasicAlert';
import logo from './logoADE.png';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook para navegar
    
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertInfo, setAlertInfo] = useState({ severity: '', message: '' });

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    const showBasicAlert = (severity, message) => {
        setAlertInfo({ severity, message });
        setAlertOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            if (!response.ok) {
                const errorData = await response.json(); // Intenta obtener más detalles del error del cuerpo de la respuesta
                throw new Error(errorData.message || 'Failed to login');
            }
            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('role', data.user.role);
            showBasicAlert('success', 'Login completado correctamente: Redirigiendo...');
            // Retrasa la redirección para permitir que la alerta sea visible
            setTimeout(() => {
                if (data.user.role === 'admin') {
                    navigate("/homeAdmin");
                }
                else if (data.user.role === 'profesor') {
                    navigate("/home");
                };
            }, 3000); // Retraso de 3 segundos
        } catch (error) {
            showBasicAlert('error', `El login falló: Introduzca un usuario y contraseña válidos`);
            console.log(error.message);
        }
    };

    return (
        <Box sx={{  backgroundImage: 'url(https://marketplace.canva.com/EAFGKWZ7S3c/1/0/1600w/canva-fondo-de-pantalla-caritas-felices-aesthetic-gradiente-morado-y-rosa-yuWW9A_crYQ.jpg)',
                    backgroundColor: 'blue',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    // Centrar horizontalmente 
                    justifyContent: 'center', 
                    // Centrar verticalmente
                    alignItems: 'center'}}>  
            <Typography  variant="h4" component="h1" sx={{ color: '#1F356C', marginTop: 1, fontFamily:'"Jersey 20", cursive', fontSize: 60, fontWeight: 'bold'}} >
                AGILE DRIVEN EDUCATION
            </Typography>
            <Typography variant="h4" component="h1" sx={{ marginTop:-2, color: '#1F356C', fontFamily:'"Dancing Script", cursive;' , fontOpticalSizing: 'auto', fontWeight: 'bold', fontSize: 50}}>
                ToolKit
            </Typography>
            <img 
                src={logo} // URL de la imagen
                alt="Descripción de la imagen" 
                style={{ width: 'auto', marginBottom: '2vh' , marginTop: 0}} // Ajusta el estilo según sea necesario
            />
            <Box
                component="form"
                sx={{display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > *': {  width: '50vh' }, 
                    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Aumentar opacidad y color de fondo
                    padding: '20px',
                    borderRadius: '8px', // Añadido para suavizar los bordes
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Sombra sutil para dar profundidad
                }}
                noValidate  autoComplete="off"   onSubmit={handleSubmit}>
                    <TextField id="username" label="Usuario" variant="outlined" type="text" sx={{mt: 1}} required value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <TextField id="password" label="Contraseña" variant="outlined"  type="password" sx={{mt: 1}} required value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <Button variant="contained" type="submit" sx={{ mt:3, width: '30vh', alignSelf: 'center', bgcolor: '#007FFF', '&:hover': {bgcolor: 'blue', }}}>
                        INICIAR SESIÓN
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

export default Login;
