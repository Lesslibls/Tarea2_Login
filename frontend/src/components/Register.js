import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        image: ''
    });

    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const { name, email, phone, password, image } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            setMsg(res.data.msg);
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setMsg(err.response.data.msg);
        }
    };

    return (
        // Contenedor para centrar la tarjeta vertical y horizontalmente
        <div className="d-flex justify-content-center align-items-center vh-100">
            {/* La tarjeta con sombra y padding */}
            <div className="card p-4 shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
                <div className="text-center mb-4">
                    <img src="/logo.png" alt="Logo" className="img-fluid mb-3" style={{ maxWidth: '100px' }} />
                    <h2 className="card-title">Crear una cuenta</h2>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={name}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Teléfono</label>
                        <input
                            type="text"
                            className="form-control"
                            name="phone"
                            value={phone}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">URL de la imagen</label>
                        <input
                            type="text"
                            className="form-control"
                            name="image"
                            value={image}
                            onChange={onChange}
                        />
                    </div>
                    {/* Botón en color azul (btn-primary) y que ocupe todo el ancho (w-100) */}
                    <button type="submit" className="btn btn-primary w-100">Registrarme</button>
                </form>
                {msg && (
                    <div className={`mt-3 alert ${msg.includes('exitosamente') ? 'alert-success' : 'alert-danger'}`}>
                        {msg}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Register;