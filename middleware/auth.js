// middleware/auth.js

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Verificar si se incluye un token en el encabezado de autorización
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token de autorización no proporcionado' });
    }

    // Verificar el token JWT
    jwt.verify(token, 'tu_clave_secreta', (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ error: 'Token de autorización inválido' });
        }

        // Establecer req.user con la información del usuario autenticado
        req.user = decodedToken;
        next();
    });
};
