// routes/usuariosRoutes.js
const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const auth = require('../middleware/auth');


router.get('/obtener-usuario', auth, usuariosController.obtener_usuario);
router.get('/', auth, usuariosController.obtener_usuarios);
router.post('/', auth, usuariosController.crear_usuario);
router.put('/:id', auth, usuariosController.actualizar_usuario);
router.delete('/:id', auth, usuariosController.eliminar_Usuario);

module.exports = router;
