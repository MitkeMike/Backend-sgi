const express = require('express');
const router = express.Router();
const incidenciasController = require('../controllers/incidencias_Controller');
const auth = require('../middleware/auth');

/**
 * Rutas para manejar incidencias.
 * Todas las rutas requieren autenticación mediante el middleware `auth`.
 */

// Ruta para obtener todas las incidencias
router.get('/', auth, incidenciasController.obtener_todas_Incidencias);

// Ruta para crear una nueva incidencia
router.post('/', auth, incidenciasController.crear_Incidencia);

// Ruta para actualizar una incidencia existente
router.post('/actualizar', auth, incidenciasController.actualizar_Incidencia);

// Ruta para buscar una incidencia por código o título
router.post('/buscar-incidencia', auth, incidenciasController.buscar_incidencia);

// Ruta para obtener el estado de una incidencia específica por su código
router.get('/estado/:ct_cod_incidencia', auth, incidenciasController.obtener_estado_incidencia);

// Ruta para cambiar el estado de una incidencia
router.post('/cambiar-estado', auth, incidenciasController.cambiar_estado_incidencia);

module.exports = router;
