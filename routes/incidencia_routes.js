const express = require('express');
const router = express.Router();
const incidenciasController = require('../controllers/incidencias_Controller');
const auth = require('../middleware/auth');


router.get('/', auth, incidenciasController.obtener_todas_Incidencias);
router.post('/',auth, incidenciasController.crear_Incidencia);
router.post('/actualizar',auth, incidenciasController.actualizar_Incidencia);
router.post('/buscar-incidencia',auth, incidenciasController.buscar_incidencia);
router.get('/estado/:ct_cod_incidencia', auth, incidenciasController.obtener_estado_incidencia);
router.post('/cambiar-estado', auth, incidenciasController.cambiar_estado_incidencia);

module.exports = router;