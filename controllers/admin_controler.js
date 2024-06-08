const Afectaciones = require('../models/Afectaciones');
const Categorias = require('../models/Categorias');
const Departamento = require('../models/Departamento');
const Estados = require('../models/Estados');
const Pantallas = require('../models/Pantallas');
const Riesgos = require('../models/Riesgos');
const Roles = require('../models/Roles');
const Sistema = require('../models/Sistema');
const Prioridades = require('../models/Prioridades');
const Usuarios = require('../models/Usuarios');
const Asignacion_incidencia = require('../models/Asignacion_incidencia');


exports.obtener_todas_Afectaciones = async (req, res) => {
    try {
        const afectaciones = await Afectaciones.findAll();
        if (afectaciones.length === 0) {
            return res.status(404).json({ message: 'No se encontraron afectaciones' });
        }
        res.json(afectaciones);
    } catch (error) {
        console.error('Error al obtener afectaciones:', error);
        res.status(500).send('Error interno del servidor');
    }
}

exports.obtener_todas_categorias = async (req, res) => {
    try {
        const categorias = await Categorias.findAll();
        if (categorias.length === 0) {
            return res.status(404).json({ message: 'No se encontraron categorias' });
        }
        res.json(categorias);
    } catch (error) {
        console.error('Error al obtener categorias:', error);
        res.status(500).send('Error interno del servidor');
    }
}

exports.obtener_todos_departamentos = async (req, res) => {
    try {
        const departamentos = await Departamento.findAll();
        if (departamentos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron departamentos' });
        }
        res.json(departamentos);
    } catch (error) {
        console.error('Error al obtener departamentos:', error);
        res.status(500).send('Error interno del servidor');
    }
}

exports.obtener_todos_estados = async (req, res) => {
    try {
        const estados = await Estados.findAll();
        if (estados.length === 0) {
            return res.status(404).json({ message: 'No se encontraron estados' });
        }
        res.json(estados);
    } catch (error) {
        console.error('Error al obtener estados:', error);
        res.status(500).send('Error interno del servidor');
    }
}

exports.obtener_todas_pantallas = async (req, res) => {
    try {
        const pantallas = await Pantallas.findAll();
        if (pantallas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron pantallas' });
        }
        res.json(pantallas);
    } catch (error) {
        console.error('Error al obtener pantallas:', error);
        res.status(500).send('Error interno del servidor');
    }
}

exports.obtener_todos_riesgos = async (req, res) => {
    try {
        const riesgos = await Riesgos.findAll();
        if (riesgos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron riesgos' });
        }
        res.json(riesgos);
    } catch (error) {
        console.error('Error al obtener riesgos:', error);
        res.status(500).send('Error interno del servidor');
    }
}

exports.obtener_todos_roles = async (req, res) => {
    try {
        const roles = await Roles.findAll();
        if (roles.length === 0) {
            return res.status(404).json({ message: 'No se encontraron roles' });
        }
        res.json(roles);
    } catch (error) {
        console.error('Error al obtener roles:', error);
        res.status(500).send('Error interno del servidor');
    }
}

exports.obtener_todos_sistemas = async (req, res) => {
    try {
        const sistemas = await Sistema.findAll();
        if (sistemas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron sistemas' });
        }
        res.json(sistemas);
    } catch (error) {
        console.error('Error al obtener sistemas:', error);
        res.status(500).send('Error interno del servidor');
    }
}

exports.obtener_todas_prioridades = async (req, res) => {
    try {
        const prioridades = await Prioridades.findAll();
        if (prioridades.length === 0) {
            return res.status(404).json({ message: 'No se encontraron prioridades' });
        }
        res.json(prioridades);
    } catch (error) {
        console.error('Error al obtener prioridades:', error);
        res.status(500).send('Error interno del servidor');
    }
}

exports.obtener_todos_usuarios = async (req, res) => {
    try {
        const usuarios = await Usuarios.findAll();
        if (usuarios.length === 0) {
            return res.status(404).json({ message: 'No se encontraron usuarios' });
        }
        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).send('Error interno del servidor');
    }
}

exports.asignar_incidencia = async (req, res) => {
    try {
        const ct_cod_incidencia = req.params.ct_cod_incidencia;
        const { cn_user_id } = req.body;

        if (!cn_user_id) {
            return res.status(400).send('cn_user_id es requerido');
        }
        
        const asignacion = await Asignacion_incidencia.create({ ct_cod_incidencia, cn_user_id });
        res.json(asignacion);
    } catch (error) {
        console.error('Error al asignar incidencia:', error);
        res.status(500).send('Error interno del servidor');
    }
}