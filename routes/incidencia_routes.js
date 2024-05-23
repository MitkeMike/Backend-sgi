const express = require('express');
const router = express.Router();
const incidenciasController = require('../controllers/incidencias_Controller');

router.get('/', incidenciasController.obtener_todas_Incidencias);
router.post('/', incidenciasController.crear_Incidencia);

module.exports = router;