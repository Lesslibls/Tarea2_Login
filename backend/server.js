const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Nuevas importaciones de middleware
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const rateLimit = require('express-rate-limit');
const MongoStore = require('connect-mongo');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware de análisis del cuerpo (¡SIEMPRE deben ir primero!)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware de seguridad y gestión
// Estos middlewares deben ejecutarse después de que el cuerpo ha sido procesado
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Configuración de la sesión
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
}));

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Configuración del límite de peticiones
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: 'Demasiadas peticiones desde esta IP, por favor intente de nuevo después de 15 minutos.'
}));


// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('¡Conectado a MongoDB!'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));

// --- RUTAS ---
// Las rutas siempre deben ir al final del middleware para que las peticiones se procesen correctamente
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
    res.send('¡Servidor de backend funcionando!');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});