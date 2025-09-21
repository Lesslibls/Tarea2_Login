import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
    return (
        <div>
            <h2>¡Bienvenido!</h2>
            <p>Has iniciado sesión exitosamente.</p>
            <Link to="/login">Cerrar sesión</Link>
        </div>
    );
};

export default Welcome;
