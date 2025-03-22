import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductItem = ({ product, onDelete }) => {
    return (
        <tr>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>
                {product.description.length > 50
                    ? `${product.description.substring(0, 50)}...`
                    : product.description}
            </td>
            <td>${product.price.toLocaleString()}</td>
            <td>
                <div className="d-flex gap-2">
                    <Link to={`/view/${product.id}`} className="btn btn-info btn-sm">
                        Ver
                    </Link>
                    <Link to={`/edit/${product.id}`} className="btn btn-warning btn-sm">
                        Editar
                    </Link>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onDelete(product.id)}
                    >
                        Eliminar
                    </Button>
                </div>
            </td>
        </tr>
    );
};

export default ProductItem;