import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import BasicAlert from './BasicAlert';

const ProtectedRoute = ({ allowedRoles }) => {
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertInfo, setAlertInfo] = useState({ severity: '', message: '' });
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            showBasicAlert('error', 'No autenticado. Por favor, inicie sesión.');
            setIsAuthenticated(false);
            setLoading(false);
            return;
        }

        fetch('http://localhost:5001/protected', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) throw new Error('Autenticación fallida.');
            return response.json();
        })
        .then(data => {
            localStorage.setItem('token', data.token);
            setIsAuthenticated(true);
        })
        .catch(error => {
            console.error(error);
            showBasicAlert('error', 'Autenticación fallida. Por favor, inicie sesión nuevamente.');
            setIsAuthenticated(false);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []); // Este efecto debe ejecutarse solo una vez al montar el componente

    useEffect(() => {
        if (isAuthenticated && user && allowedRoles && !allowedRoles.includes(user.role)) {
            showBasicAlert('warning', 'No cuentas con los permisos necesarios para acceder a esta página.');
        }
    }, [isAuthenticated, user, allowedRoles]);

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    const showBasicAlert = (severity, message) => {
        setAlertInfo({ severity, message });
        setAlertOpen(true);
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (isAuthenticated === false) {
        return <Navigate to="/login" replace />;
    }

    if (isAuthenticated && user && allowedRoles && !allowedRoles.includes(user.role)) {
        return (
            <div>
                <BasicAlert
                    open={alertOpen}
                    handleClose={handleAlertClose}
                    severity={alertInfo.severity}
                    message={alertInfo.message}
                />
                <div style={{ padding: 20 }}>
                    <h2>Acceso Denegado</h2>
                    <p>No tienes permiso para acceder a esta página.</p>
                </div>
            </div>
        );
    }

    return isAuthenticated ? <Outlet /> : <p>Error en la carga. Intente nuevamente más tarde.</p>;
};

export default ProtectedRoute;
