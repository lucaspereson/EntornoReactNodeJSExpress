import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);  // Nuevo estado para manejar la carga

    const contextValue = {
        user,
        setUser,
        loading,
        setLoading,
    };
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUser(userData);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);


    if (loading) {
        return <div>Loading...</div>;  // Opcionalmente, mostrar algún indicador de carga
    }

    return (
        <AuthContext.Provider value={ contextValue }>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
