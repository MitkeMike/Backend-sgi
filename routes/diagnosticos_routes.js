const express = require('express');
const router = express.Router();
const diagnosticosController = require('../controllers/diagnosticos_Controller');

router.get('/', diagnosticosController.obtener_todos_Diagnosticos);
router.post('/', diagnosticosController.crear_Diagnostico);

module.exports = router;