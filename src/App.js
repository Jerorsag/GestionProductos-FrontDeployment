// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProductList from './components/products/ProductList';
import ProductDetail from './components/products/ProductDetail';
import ProductForm from './components/products/ProductForm';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import UserProfile from './components/auth/UserProfile';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider} from "./components/context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/darkTheme.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Layout>
                    <Routes>
                        {/* Rutas públicas */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Rutas protegidas */}
                        <Route element={<ProtectedRoute />}>
                            <Route path="/" element={<ProductList />} />
                            <Route path="/create" element={<ProductForm />} />
                            <Route path="/edit/:id" element={<ProductForm />} />
                            <Route path="/view/:id" element={<ProductDetail />} />
                            <Route path="/profile" element={<UserProfile />} />
                        </Route>

                        {/* Ruta de redirección para rutas no encontradas */}
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </Layout>
            </Router>
        </AuthProvider>
    );
}

export default App;