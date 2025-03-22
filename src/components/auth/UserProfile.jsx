// src/components/auth/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { Card, Button, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const UserProfile = () => {
    const { currentUser, logout } = useAuth();
    const [loading, setLoading] = useState(false);

    if (!currentUser) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
                <p className="mt-3">Cargando información del usuario...</p>
            </div>
        );
    }

    const handleLogout = () => {
        logout();
        // La redirección se hará automáticamente por las rutas protegidas
    };

    return (
        <Card className="shadow-sm">
            <Card.Header>
                <h2 className="text-primary">Perfil de Usuario</h2>
            </Card.Header>
            <Card.Body>
                <div className="mb-4">
                    <h3 className="text-secondary">Información Personal</h3>
                    <p className="text-white"><strong>Nombre de usuario:</strong> {currentUser.username}</p>
                    <p className="text-white"><strong>Nombre completo:</strong> {currentUser.firstName} {currentUser.lastName}</p>
                    <p className="text-white"><strong>País:</strong> {currentUser.country}</p>
                    <p className="text-white"><strong>Rol:</strong> {currentUser.role}</p>
                </div>

                <Button
                    variant="danger"
                    onClick={handleLogout}
                >
                    Cerrar Sesión
                </Button>
            </Card.Body>
        </Card>
    );
};

export default UserProfile;