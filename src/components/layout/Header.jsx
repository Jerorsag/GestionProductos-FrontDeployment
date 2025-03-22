// src/components/layout/Header.jsx
import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { currentUser, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand as={Link} to="/">Sistema de Gestión de Productos</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Productos</Nav.Link>
                        {isAuthenticated() && (
                            <Nav.Link as={Link} to="/create">Crear Producto</Nav.Link>
                        )}
                    </Nav>
                    <Nav>
                        {isAuthenticated() ? (
                            <>
                                <Nav.Link as={Link} to="/profile">
                                    {currentUser?.firstName || 'Mi Perfil'}
                                </Nav.Link>
                                <Button
                                    variant="outline-danger"
                                    onClick={handleLogout}
                                >
                                    Cerrar Sesión
                                </Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
                                <Nav.Link as={Link} to="/register">Registrarse</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;