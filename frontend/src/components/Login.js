import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/login', { email, password });
            navigate('/welcome');
        } catch (err) {
            console.error(err.response.data);
            alert(err.response.data.msg);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow">
                <div className="text-center mb-4">
                    <img src="/logo.png" alt="Logo" className="img-fluid mb-3" style={{ maxWidth: '100px' }} />
                    <h2 className="card-title">Iniciar Sesión</h2>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="emailInput" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="emailInput"
                            placeholder="tucorreo@ejemplo.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passwordInput" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="passwordInput"
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
                </form>
            </div>
        </div>
    );
};

export default Login;