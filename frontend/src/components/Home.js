import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container text-center mt-5">
            <div className="card p-4 shadow">
                <h2>Bienvenido</h2>
                <p>Por favor, regístrate o inicia sesión para continuar.</p>
                <div className="d-flex justify-content-center mt-4">
                    <Link to="/register" className="btn btn-primary m-2">
                        Registrarme
                    </Link>
                    <Link to="/login" className="btn btn-success m-2">
                        Iniciar sesión
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;