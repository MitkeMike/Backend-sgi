const Usuario = require('../models/usuarios');
require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.obtener_usuario = async (req, res) => {
    try {
        // Extraer el token 
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Token de autorización no proporcionado' });
        }

        // Verificar y decodificar el token para obtener el ID de usuario
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;

        // Buscar el usuario en la base de datos
        const usuario = await Usuario.findByPk(userId);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Si se encuentra el usuario, enviarlo en la respuesta
        res.json(usuario);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).send('Error interno del servidor');
    }
}

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

