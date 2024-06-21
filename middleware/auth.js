// middleware/auth.js
require('dotenv').config();
const jwt = require('jsonwebtoken');

/**
 * Middleware de autenticación para verificar el token JWT.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función para pasar el control al siguiente middleware.
 */
module.exports = (req, res, next) => {
    // Verificar si se incluye un token en el encabezado de autorización
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token de autorización no proporcionado' }); // Retornar error si no hay token
    }

    // Verificar el token JWT
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ error: 'Token de autorización inválido' }); // Retornar error si el token es inválido
        }

        // Establecer req.user con la información del usuario autenticado
        req.user = decodedToken;
        next(); // Pasar el control al siguiente middleware
    });
};
