const express = require('express');
const router = express.Router();
const diagnosticosController = require('../controllers/diagnosticos_Controller');
const auth = require('../middleware/auth');

router.get('/', auth, diagnosticosController.obtener_todos_Diagnosticos);
router.post('/', auth, diagnosticosController.crear_Diagnostico);

module.exports = router;