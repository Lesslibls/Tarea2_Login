import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Borra el estado de la sesión del navegador
        localStorage.removeItem('isLoggedIn');
        
        // Redirige al usuario a la página de login
        navigate('/login');
    };

    return (
        <div className="container text-center mt-5">
            <div className="card p-4 shadow">
                <h2>¡Bienvenido!</h2>
                <p>Has iniciado sesión exitosamente.</p>
                <button 
                    onClick={handleLogout} 
                    className="btn btn-danger mt-3"
                >
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
};

export default Welcome;