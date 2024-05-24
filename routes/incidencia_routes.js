const express = require('express');
const router = express.Router();
const incidenciasController = require('../controllers/incidencias_Controller');
const auth = require('../middleware/auth');


router.get('/', auth, incidenciasController.obtener_todas_Incidencias);
router.post('/',auth, incidenciasController.crear_Incidencia);

module.exports = router;