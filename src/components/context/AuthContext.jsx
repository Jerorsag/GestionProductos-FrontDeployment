// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from "../../services/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadUserInfo = async () => {
            if (authService.isAuthenticated()) {
                try {
                    const userData = await authService.getCurrentUser();
                    setCurrentUser(userData);
                } catch (err) {
                    console.error('Error cargando datos del usuario:', err);
                    // Si hay un error al cargar el usuario, cerramos la sesión
                    authService.logout();
                }
            }
            setLoading(false);
        };

        loadUserInfo();
    }, []);

    const login = async (credentials) => {
        try {
            setError(null);
            const data = await authService.login(credentials);
            // Después de login exitoso, cargamos la información del usuario
            const userData = await authService.getCurrentUser();
            setCurrentUser(userData);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || 'Error al iniciar sesión');
            throw err;
        }
    };

    const register = async (userData) => {
        try {
            setError(null);
            const data = await authService.register(userData);
            // Después de registro exitoso, cargamos la información del usuario
            const userInfo = await authService.getCurrentUser();
            setCurrentUser(userInfo);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || 'Error al registrar');
            throw err;
        }
    };

    const logout = () => {
        authService.logout();
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated: authService.isAuthenticated
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};