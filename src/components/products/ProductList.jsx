import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import productService from '../../services/productService';
import ProductItem from './ProductItem';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await productService.getAllProducts();
            setProducts(data);
            setError(null);
        } catch (err) {
            setError('Error al cargar los productos. Por favor, intenta nuevamente.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            try {
                await productService.deleteProduct(id);
                setProducts(products.filter(product => product.id !== id));
                setDeleteSuccess(true);
                setTimeout(() => setDeleteSuccess(false), 3000);
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
                <p className="mt-3">Cargando productos...</p>
            </div>
        );
    }

    return (
        <Card className="shadow-sm">
            <Card.Header className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0 text-success">Lista de Productos</h2>
                <Link to="/create" className="btn btn-success">Nuevo Producto</Link>
            </Card.Header>
            <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                {deleteSuccess && <Alert variant="success">Producto eliminado con éxito.</Alert>}

                {products.length === 0 ? (
                    <Alert variant="info">
                        No hay productos disponibles. ¡Agrega uno nuevo!
                    </Alert>
                ) : (
                    <div className="table-responsive">
                        <Table hover className="table-dark">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Precio</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map(product => (
                                <ProductItem
                                    key={product.id}
                                    product={product}
                                    onDelete={handleDelete}
                                />
                            ))}
                            </tbody>
                        </Table>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default ProductList;