import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    // 1. Estados para cada campo del formulario
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onSubmit = async e => {
        e.preventDefault();
        try {
            // 2. Usamos Axios para hacer una petición POST al endpoint de registro
            await axios.post('http://localhost:5000/api/auth/register', {
                name,
                email,
                phone,
                image,
                password,
            });

            // 3. Si la petición es exitosa, redirigimos al usuario a la página de login
            alert('¡Usuario registrado exitosamente!');
            navigate('/login');
        } catch (err) {
            // 4. Si hay un error, mostramos un mensaje de alerta
            console.error(err.response.data);
            alert(err.response.data.msg);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <h2>Registro de Usuario</h2>
            <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={e => setName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <input
                type="tel"
                placeholder="Teléfono"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="URL de la Imagen"
                value={image}
                onChange={e => setImage(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            <button type="submit">Registrar</button>
        </form>
    );
};

export default Register;
