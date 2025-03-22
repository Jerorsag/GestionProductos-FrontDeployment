import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import productService from '../../services/productService';

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: ''
    });

    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (isEditing) {
            const fetchProduct = async () => {
                try {
                    setLoading(true);
                    const data = await productService.getProductById(id);
                    setFormData({
                        name: data.name,
                        description: data.description,
                        price: data.price.toString()
                    });
                    setError(null);
                } catch (err) {
                    setError('No se pudo cargar el producto para editar.');
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };

            fetchProduct();
        }
    }, [id, isEditing]);

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
            const productData = {
                ...formData,
                price: parseInt(formData.price, 10)
            };

            if (isEditing) {
                await productService.updateProduct(id, productData);
                navigate(`/view/${id}`, { state: { message: 'Producto actualizado con éxito' } });
            } else {
                const newProduct = await productService.createProduct(productData);
                navigate(`/view/${newProduct.id}`, { state: { message: 'Producto creado con éxito' } });
            }
        } catch (err) {
            setError(`Error al ${isEditing ? 'actualizar' : 'crear'} el producto. Intenta nuevamente.`);
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
                <p className="mt-3">Cargando datos del producto...</p>
            </div>
        );
    }

    return (
        <Card className="shadow-sm">
            <Card.Header>
                <h2 className="text-success">{isEditing ? 'Editar Producto' : 'Crear Nuevo Producto'}</h2>
            </Card.Header>
            <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="productName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Ingresa el nombre del producto"
                        />
                        <Form.Control.Feedback type="invalid">
                            El nombre del producto es obligatorio.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="productDescription">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            placeholder="Ingresa la descripción del producto"
                        />
                        <Form.Control.Feedback type="invalid">
                            La descripción del producto es obligatoria.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="productPrice">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            min="0"
                            placeholder="Ingresa el precio del producto"
                        />
                        <Form.Control.Feedback type="invalid">
                            Ingresa un precio válido.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-flex gap-2">
                        <Button
                            variant="danger"
                            onClick={() => navigate('/')}
                            disabled={submitting}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="success"
                            type="submit"
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
                                    {isEditing ? 'Actualizando...' : 'Guardando...'}
                                </>
                            ) : (
                                isEditing ? 'Actualizar Producto' : 'Crear Producto'
                            )}
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default ProductForm;