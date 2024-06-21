const Usuario = require('../models/Usuarios');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const sequelize = require('../database');
const { Op } = require('sequelize');

/**
 * Obtener el usuario autenticado basado en el token de autorización.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 */
exports.obtener_usuario = async (req, res) => {
    try {
        // Extraer el token de la cabecera de autorización
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
};

/**
 * Buscar usuarios en la base de datos basado en nombre, cédula o correo.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 */
exports.buscar_usuario = async (req, res) => {
    const { ct_nombre, ct_cedula, ct_correo } = req.body;
    try {
        const conditions = [];
        if (ct_nombre) {
            conditions.push({ ct_nombre: { [Op.like]: `%${ct_nombre}%` } });
        }
        if (ct_cedula) {
            conditions.push({ ct_cedula: { [Op.like]: `%${ct_cedula}%` } });
        }
        if (ct_correo) {
            conditions.push({ ct_correo: { [Op.like]: `%${ct_correo}%` } });
        }
        if (conditions.length === 0) {
            const usuarios = await Usuario.findAll();
            return res.json(usuarios);
        } else {
            const usuario = await Usuario.findAll({ where: { [Op.or]: conditions } });
            if (!usuario.length) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.json(usuario);
        }
    } catch (error) {
        console.error('Error al buscar usuario:', error);
        res.status(500).send('Error interno del servidor');
    }
};

/**
 * Obtener todos los usuarios de la base de datos.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 */
exports.obtener_usuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).send('Error interno del servidor');
    }
};

/**
 * Crear un nuevo usuario en la base de datos.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 */
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

/**
 * Actualizar un usuario existente en la base de datos.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 */
exports.actualizar_usuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            res.status(404).send();
            return;
        }
        usuario.ct_nombre = req.body.ct_nombre;
        usuario.ct_correo = req.body.ct_correo;
        usuario.ct_password = req.body.ct_password;
        await usuario.save();
        res.json(usuario);
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).send('Error interno del servidor');
    }
};

/**
 * Eliminar un usuario de la base de datos.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 */
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
