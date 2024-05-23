// routes/usuariosRoutes.js
const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.get('/', usuariosController.obtener_usuarios);
router.post('/', usuariosController.crear_usuario);
router.put('/:id', usuariosController.actualizar_usuario);
router.delete('/:id', usuariosController.eliminar_Usuario);
router.post('/login', usuariosController.login_usuario);

module.exports = router;
