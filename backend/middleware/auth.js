// backend/middleware/auth.js

// Middleware para verificar si el usuario está autenticado
function isAuthenticated(req, res, next) {
    if (req.session.isLoggedIn) {
        // Si el usuario tiene una sesión activa, permite continuar
        next();
    } else {
        // Si no, devuelve un error 401 (no autorizado)
        res.status(401).json({ msg: 'No autorizado. Por favor, inicia sesión.' });
    }
}

module.exports = isAuthenticated;