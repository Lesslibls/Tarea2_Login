const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Nuevas importaciones de middleware
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const xss = require('xss-clean');
const passport = require('passport');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware de seguridad y de gestión
app.use(express.json()); // Permite que Express lea el cuerpo de las peticiones
app.use(express.urlencoded({ extended: false })); // Permite que Express lea datos de formularios
app.use(helmet()); // Ayuda a proteger de vulnerabilidades
app.use(morgan('dev')); // Registra las peticiones HTTP
app.use(xss()); // Limpia los datos de ataques XSS

// Configuración de la sesión
const MongoStore = require('connect-mongo');
app.use(session({
    secret: process.env.SESSION_SECRET,//variable de entorno
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
}));

// Inicializar Passport para la autenticación
app.use(passport.initialize());
app.use(passport.session());

// Configuración del límite de peticiones para prevenir ataques de fuerza bruta
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 50, // Máximo 50 peticiones por IP en 15 minutos
    message: 'Demasiadas peticiones desde esta IP, por favor intente de nuevo después de 15 minutos.'
});
app.use(limiter);

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('¡Conectado a MongoDB!'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));

app.get('/', (req, res) => {
    res.send('¡Servidor de backend funcionando!');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});