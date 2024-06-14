const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin_controler');
const auth = require('../middleware/auth');

router.get('/afectaciones', auth, adminController.obtener_todas_Afectaciones);
router.get('/categorias', auth, adminController.obtener_todas_categorias);
router.get('/departamentos', auth, adminController.obtener_todos_departamentos);
router.get('/estados', auth, adminController.obtener_todos_estados);
router.get('/pantallas', auth, adminController.obtener_todas_pantallas);
router.get('/riesgos', auth, adminController.obtener_todos_riesgos);
router.get('/sistema', auth, adminController.obtener_todos_sistemas);
router.get('/roles', auth, adminController.obtener_todos_roles);
router.get('/prioridades', auth, adminController.obtener_todas_prioridades);
router.post('/asignar-incidencia/:ct_cod_incidencia',auth,adminController.asignar_incidencia);
router.post('/asignar-roles/',auth,adminController.asignar_roles_a_usuario);
router.post('/eliminar-roles/',auth,adminController.eliminar_roles_de_usuario);

router.get('/tecnicos', auth, adminController.obtener_todos_tecnicos);

module.exports = router;