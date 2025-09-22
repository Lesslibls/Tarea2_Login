import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            
            localStorage.setItem('isLoggedIn', 'true');
            setMsg(res.data.msg); 
            navigate('/welcome');
        } catch (err) {
            if (err.response && err.response.data && err.response.data.msg) {
                const errorMessage = err.response.data.msg;

                if (errorMessage === 'Credenciales inválidas') {
                    setMsg('Usuario no encontrado. Por favor, regístrese.');
                    setTimeout(() => navigate('/register'), 2000);
                } else {
                    setMsg(errorMessage);
                }
            } else {
                setMsg('Error del servidor. Intente de nuevo más tarde.');
            }
        }
    };

    return (
        // Contenedor para centrar la tarjeta vertical y horizontalmente
        <div className="d-flex justify-content-center align-items-center vh-100">
            {/* La tarjeta con sombra y padding */}
            <div className="card p-4 shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
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
                    {/* Botón en color azul (btn-primary) y que ocupe todo el ancho (w-100) */}
                    <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
                </form>
                {msg && (
                    <div className={`mt-3 alert ${msg.includes('éxito') ? 'alert-success' : 'alert-danger'}`}>
                        {msg}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;