const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin_controler');
const auth = require('../middleware/auth');

/**
 * Rutas protegidas para el administrador.
 * Todas las rutas utilizan el middleware de autenticación `auth` para garantizar que solo usuarios autenticados puedan acceder.
 */

// Ruta para obtener todas las afectaciones
router.get('/afectaciones', auth, adminController.obtener_todas_Afectaciones);

// Ruta para obtener todas las categorías
router.get('/categorias', auth, adminController.obtener_todas_categorias);

// Ruta para obtener todos los departamentos
router.get('/departamentos', auth, adminController.obtener_todos_departamentos);

// Ruta para obtener todos los estados
router.get('/estados', auth, adminController.obtener_todos_estados);

// Ruta para obtener todas las pantallas
router.get('/pantallas', auth, adminController.obtener_todas_pantallas);

// Ruta para obtener todos los riesgos
router.get('/riesgos', auth, adminController.obtener_todos_riesgos);

// Ruta para obtener todos los sistemas
router.get('/sistema', auth, adminController.obtener_todos_sistemas);

// Ruta para obtener todos los roles
router.get('/roles', auth, adminController.obtener_todos_roles);

// Ruta para obtener todas las prioridades
router.get('/prioridades', auth, adminController.obtener_todas_prioridades);

// Ruta para asignar una incidencia a un usuario
router.post('/asignar-incidencia/:ct_cod_incidencia', auth, adminController.asignar_incidencia);

// Ruta para asignar roles a un usuario
router.post('/asignar-roles/', auth, adminController.asignar_roles_a_usuario);

// Ruta para eliminar roles de un usuario
router.post('/eliminar-roles/', auth, adminController.eliminar_roles_de_usuario);

// Ruta para obtener todos los técnicos
router.get('/tecnicos', auth, adminController.obtener_todos_tecnicos);

// Ruta para obtener los roles de un usuario específico
router.get('/usuario-roles/:cn_id_usuario', auth, adminController.roles_por_usuario);

// Ruta para obtener el reporte de horas trabajadas
router.get('/reporte-horas-trabajadas', auth, adminController.reporte_horas_trabajadas);

module.exports = router;
