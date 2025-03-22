import React, { useState, useEffect } from 'react';
import { Card, Button, Alert, Spinner } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import productService from '../../services/productService';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await productService.getProductById(id);
                setProduct(data);
                setError(null);
            } catch (err) {
                setError('No se pudo cargar el producto. Puede que no exista o haya sido eliminado.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            try {
                await productService.deleteProduct(id);
                navigate('/', { state: { message: 'Producto eliminado con éxito' } });
            } catch (err) {
                setError('Error al eliminar el producto.');
                console.error(err);
            }
        }
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
                <p className="mt-3">Cargando detalles del producto...</p>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="danger">
                {error}
                <div className="mt-3">
                    <Link to="/" className="btn btn-primary">Volver a la lista</Link>
                </div>
            </Alert>
        );
    }

    return (
        <Card className="shadow-sm">
            <Card.Header>
                <h2 className="text-white">Detalles del Producto</h2>
            </Card.Header>
            <Card.Body>
                {product && (
                    <div>
                        <h3 className="mb-4 text-white">{product.name}</h3>

                        <div className="mb-4">
                            <h5 className="text-white">Descripción:</h5>
                            <p className="text-white">{product.description}</p>
                        </div>

                        <div className="mb-4">
                            <h5 className="text-white">Precio:</h5>
                            <p className="fs-4 text-white">${product.price.toLocaleString()}</p>
                        </div>

                        <div className="mb-4">
                            <h5 className="text-white">ID:</h5>
                            <p className="text-white">{product.id}</p>
                        </div>

                        <div className="d-flex gap-2 mt-4">
                            <Link to="/" className="btn btn-secondary">
                                Volver
                            </Link>
                            <Link to={`/edit/${product.id}`} className="btn btn-warning">
                                Editar
                            </Link>
                            <Button variant="danger" onClick={handleDelete}>
                                Eliminar
                            </Button>
                        </div>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default ProductDetail;