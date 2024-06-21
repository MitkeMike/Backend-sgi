// routes/usuariosRoutes.js
const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const auth = require('../middleware/auth');

/**
 * Rutas para manejar usuarios.
 * Todas las rutas requieren autenticación mediante el middleware `auth`.
 */

// Ruta para obtener el usuario autenticado
router.get('/obtener-usuario', auth, usuariosController.obtener_usuario);

// Ruta para obtener todos los usuarios
router.get('/', auth, usuariosController.obtener_usuarios);

// Ruta para crear un nuevo usuario
router.post('/', auth, usuariosController.crear_usuario);

// Ruta para actualizar un usuario existente por su ID
router.put('/:id', auth, usuariosController.actualizar_usuario);

// Ruta para eliminar un usuario existente por su ID
router.delete('/:id', auth, usuariosController.eliminar_Usuario);

// Ruta para buscar un usuario por diferentes criterios
router.post('/Buscar-Usuario', auth, usuariosController.buscar_usuario);

module.exports = router;
