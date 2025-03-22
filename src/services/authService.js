// src/services/authService.js
import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/api/auth`;

// Crear instancia de axios para autenticación
const authClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para añadir el token a las peticiones
authClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const authService = {
    // Login de usuario
    login: async (credentials) => {
        try {
            const response = await authClient.post('/login', credentials);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            throw error;
        }
    },

    // Registro de usuario
    register: async (userData) => {
        try {
            const response = await authClient.post('/register', userData);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            throw error;
        }
    },

    // Cerrar sesión
    logout: () => {
        localStorage.removeItem('token');
    },

    // Verificar si el usuario está autenticado
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },

    // Obtener información del usuario actual
    getCurrentUser: async () => {
        try {
            const response = await authClient.get('/user-info');
            return response.data;
        } catch (error) {
            console.error('Error al obtener información del usuario:', error);
            throw error;
        }
    }
};

export default authService;