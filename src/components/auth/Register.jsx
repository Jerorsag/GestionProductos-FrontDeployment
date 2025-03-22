// src/components/auth/Register.jsx
import React, { useState } from 'react';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        country: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        setValidated(true);
        setSubmitting(true);
        setError(null);

        try {
            await register(formData);
            navigate('/');
        } catch (err) {
            setError('Error al registrarse. Por favor, intenta nuevamente.');
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Card className="shadow-sm mx-auto" style={{ maxWidth: '500px' }}>
            <Card.Header>
                <h2 className="text-primary text-center">Registro de Usuario</h2>
            </Card.Header>
            <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Nombre de usuario</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            placeholder="Elige un nombre de usuario"
                        />
                        <Form.Control.Feedback type="invalid">
                            El nombre de usuario es obligatorio.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Ingresa una contraseña"
                        />
                        <Form.Control.Feedback type="invalid">
                            La contraseña es obligatoria.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="firstName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            placeholder="Ingresa tu nombre"
                        />
                        <Form.Control.Feedback type="invalid">
                            El nombre es obligatorio.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="lastName">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            placeholder="Ingresa tu apellido"
                        />
                        <Form.Control.Feedback type="invalid">
                            El apellido es obligatorio.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="country">
                        <Form.Label>País</Form.Label>
                        <Form.Control
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            required
                            placeholder="Ingresa tu país"
                        />
                        <Form.Control.Feedback type="invalid">
                            El país es obligatorio.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        className="w-100"
                        disabled={submitting}
                    >
                        {submitting ? (
                            <>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    className="me-2"
                                />
                                Procesando...
                            </>
                        ) : (
                            'Registrarse'
                        )}
                    </Button>
                </Form>

                <div className="mt-3 text-center">
                    <p className="text-white">¿Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link></p>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Register;