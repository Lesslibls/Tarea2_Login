const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const router = express.Router();
const User = require('../models/User'); // Asegúrate de que esta ruta sea correcta

// Ruta de registro
router.post('/register', async (req, res) => {
    // 1. Ahora extraemos 'email' y los nuevos campos
    const { name, email, phone, password, image } = req.body;

    try {
        // 2. Buscamos el usuario por el campo 'email', ya que es el único
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) return reject(err);
                bcrypt.hash(password, salt, null, (err, hash) => {
                    if (err) return reject(err);
                    resolve(hash);
                });
            });
        });

        // 3. Creamos una nueva instancia del usuario con todos los campos nuevos
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
    // 4. Extraemos 'email' en lugar de 'username'
    const { email, password } = req.body;

    try {
        // 5. Buscamos el usuario por 'email'
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        const isMatch = await new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) return reject(err);
                resolve(isMatch);
            });
        });

        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        res.json({ msg: 'Inicio de sesión exitoso' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
});

module.exports = router;