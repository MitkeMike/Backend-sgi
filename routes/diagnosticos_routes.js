const express = require('express');
const router = express.Router();
const diagnosticosController = require('../controllers/diagnosticos_Controller');
const auth = require('../middleware/auth');

router.get('/', auth, diagnosticosController.obtener_todos_Diagnosticos);
router.get('/:ct_cod_incidencia', auth, diagnosticosController.obtener_diagnostico_por_id);
router.post('/', auth, diagnosticosController.crear_Diagnostico);

module.exports = router;