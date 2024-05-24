const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuarios');

exports.login_usuario = async (req, res) => {
    try {
        const { ct_correo, ct_password } = req.body;

        // Buscar un usuario por correo electrónico
        const usuario = await Usuario.findOne({ where: { ct_correo } });

        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        // Verificar la contraseña
        if (ct_password !== usuario.ct_password) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        // Generar el token JWT
        const token = jwt.sign({ userId: usuario.cn_user_id }, 'tu_clave_secreta', { expiresIn: '1h' });

        console.log('El token es ' + token);
        usuario.ct_token = token;
        await usuario.save();
        // Enviar el token en la respuesta
        res.json({ token });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).send('Error interno del servidor');
    }
};