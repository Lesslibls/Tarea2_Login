const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs'); // Usamos bcryptjs para async/await
const isAuthenticated = require('../middleware/auth'); // Importa el middleware de autenticación

// Ruta de registro
router.post('/register', async (req, res) => {
    const { name, email, phone, password, image } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        // Usamos la versión de bcryptjs con async/await para un código más limpio
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            image,
        });

        await user.save();
        res.status(201).json({ msg: 'Usuario registrado exitosamente' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
});

// Ruta de inicio de sesión
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        // Crea una sesión para el usuario
        req.session.isLoggedIn = true;
        req.session.user = user;

        res.json({ msg: 'Inicio de sesión exitoso' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
});

// Ruta PROTEGIDA
// Solo accesible si el usuario está autenticado
router.get('/profile', isAuthenticated, async (req, res) => {
    try {
        // En una aplicación real, aquí podrías enviar datos del usuario
        // Por ahora, solo confirmaremos que la ruta funciona.
        res.json({ msg: 'Acceso concedido a la página de perfil.', user: req.session.user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
});

// Ruta para cerrar sesión
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error al cerrar sesión');
        }
        res.status(200).json({ msg: 'Sesión cerrada exitosamente' });
    });
});

module.exports = router;