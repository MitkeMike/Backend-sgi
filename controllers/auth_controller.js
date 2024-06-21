const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios');

/**
 * Maneja el inicio de sesión del usuario.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
exports.login_usuario = async (req, res) => {
    try {
        const { ct_correo, ct_password } = req.body; // Obtener correo y contraseña de la solicitud

        // Buscar un usuario por correo electrónico
        const usuario = await Usuario.findOne({ where: { ct_correo } });

        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales incorrectas' }); // Si no se encuentra el usuario, retorna error
        }

        // Verificar la contraseña
        if (ct_password !== usuario.ct_password) {
            return res.status(401).json({ error: 'Credenciales incorrectas' }); // Si la contraseña es incorrecta, retorna error
        }

        // Generar el token JWT
        const token = jwt.sign({ userId: usuario.cn_user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log('El token es ' + token);
        usuario.ct_token = token; // Asignar el token al usuario
        await usuario.save(); // Guardar el token en la base de datos

        // Eliminar datos sensibles del objeto usuario antes de enviar la respuesta
        const usuarioJSON = usuario.toJSON();
        const { ct_password: _, ...usuarioSinPassword } = usuarioJSON; // Remover la contraseña del objeto usuario

        // Enviar el token en la respuesta
        res.json({ token, message: 'Inicio de sesión exitoso', usuario: usuarioSinPassword });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).send('Error interno del servidor'); // Manejo de errores internos del servidor
    }
};
