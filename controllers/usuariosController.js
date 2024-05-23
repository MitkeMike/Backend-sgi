// controllers/usuariosController.js

const Usuario = require('../models/usuarios');

exports.obtener_usuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).send('Error interno del servidor');
    }
};

exports.crear_usuario = async (req, res) => {
    try {
        const { ct_correo } = req.body;
        // Verificar si el correo electrónico ya está registrado
        const existingUser = await Usuario.findOne({ where: { ct_correo } });
        if (existingUser) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
        }

        // Si el correo electrónico no está registrado, se crea el nuevo usuario
        const usuario = req.body;
        await Usuario.create(usuario);
        res.json(usuario);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).send('Error interno del servidor');
    }
};


exports.actualizar_usuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            res.status(404).send();
            return;
        }
        usuario.ct_nombre = req.body.ct_nombre;
        usuario.ct_correo = req.body.ct_correo;
        await usuario.save();
        res.json(usuario);
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).send('Error interno del servidor');
    }
};

exports.eliminar_Usuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            res.status(404).send();
            return;
        }
        await usuario.destroy();
        res.status(200).send();
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).send('Error interno del servidor');
    }
};

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

        // Si las credenciales son válidas, enviar una respuesta de éxito
        res.json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).send('Error interno del servidor');
    }
};