const express = require('express');
const router = express.Router();
const diagnosticosController = require('../controllers/diagnosticos_Controller');
const auth = require('../middleware/auth');

/**
 * Rutas para manejar diagnósticos.
 * Todas las rutas requieren autenticación mediante el middleware `auth`.
 */

// Ruta para obtener todos los diagnósticos
router.get('/', auth, diagnosticosController.obtener_todos_Diagnosticos);

// Ruta para obtener un diagnóstico específico por el código de incidencia
router.get('/:ct_cod_incidencia', auth, diagnosticosController.obtener_diagnostico_por_id);

// Ruta para crear un nuevo diagnóstico
router.post('/', auth, diagnosticosController.crear_Diagnostico);

module.exports = router;
