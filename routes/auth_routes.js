const express = require('express');
const router = express.Router();
const auth_controller = require('../controllers/auth_controller');

/**
 * Ruta para el inicio de sesión.
 * Esta ruta no requiere autenticación previa.
 */

// Ruta para el inicio de sesión del usuario
router.post('/login', auth_controller.login_usuario);

module.exports = router;
