const Afectaciones = require('../models/Afectaciones');
const Categorias = require('../models/Categorias');
const Departamento = require('../models/Departamento');
const Estados = require('../models/Estados');
const Pantallas = require('../models/Pantallas');
const Riesgos = require('../models/Riesgos');
const Sistema = require('../models/Sistema');
const Prioridades = require('../models/Prioridades');
const Asignacion_incidencia = require('../models/Asignacion_incidencia');
const { Usuarios, Roles } = require('../models');
const Roles_Usuario = require('../models/Roles_Usuario');
const { Op, QueryTypes } = require('sequelize');
const sequelize = require('../database');


exports.reporte_horas_trabajadas = async (req, res) => {
    try {
        const reporte = await sequelize.query(
            `SELECT 
            u.cn_user_id,
            u.ct_nombre,
            SUM(i.cn_tiempo_estimado_reparacion) AS total_horas_trabajadas
         FROM 
            t_usuarios u
         JOIN 
            t_asignacion_incidencia ai ON u.cn_user_id = ai.cn_user_id
         JOIN 
            t_incidencias i ON ai.ct_cod_incidencia = i.ct_cod_incidencia
         GROUP BY 
            u.cn_user_id, u.ct_nombre;`,
            {
                type: QueryTypes.SELECT
            }
        );

        res.json(reporte);
    } catch (error) {
        console.error('Error al generar el reporte:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};



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

exports.obtener_todos_tecnicos = async (req, res) => {
    try {
        const tecnicos = await Usuarios.findAll({
            include: {
                model: Roles,
                as: 'roles',
                where: { ct_descripcion: 'Técnico' },
                through: { attributes: [] }
            }
        });

        if (tecnicos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron técnicos' });
        }
        res.json(tecnicos);
    } catch (error) {
        console.error('Error al obtener técnicos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.asignar_incidencia = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const ct_cod_incidencia = req.params.ct_cod_incidencia;
        const { cn_user_id } = req.body;

        if (!cn_user_id) {
            console.log('cn_user_id es requerido');
            return res.status(400).send('cn_user_id es requerido');
        }

        // Obtener la incidencia
        const incidencia = await Incidencias.findOne({ where: { ct_cod_incidencia } });

        if (!incidencia) {
            console.log('Incidencia no encontrada:', ct_cod_incidencia);
            return res.status(404).send('Incidencia no encontrada');
        }

        // Verificar y actualizar el estado de la incidencia
        console.log('Estado actual de la incidencia:', incidencia.cn_id_estado); // Log del estado actual
        if (incidencia.cn_id_estado === 1) { // 1 significa "registrado"
            incidencia.cn_id_estado = 2; // 2 significa "asignado"
            console.log('Actualizando el estado a "asignado"');
            console.log('Incidencia antes de guardar:', incidencia); // Log de incidencia antes de guardar

            // Guardar la incidencia y verificar si el estado se actualiza
            await incidencia.save({ transaction });
            console.log('Incidencia después de guardar:', incidencia); // Log de incidencia después de guardar
        } else {
            console.log('El estado de la incidencia no es "registrado"'); // Log si el estado no es "registrado"
        }

        // Confirmar que la incidencia se guardó con el estado actualizado
        const updatedIncidencia = await Incidencias.findOne({ where: { ct_cod_incidencia }, transaction });
        console.log('Estado de la incidencia después de guardar:', updatedIncidencia.cn_id_estado); // Log del estado actualizado

        // Asignar la incidencia
        const asignacion = await Asignacion_incidencia.create({ ct_cod_incidencia, cn_user_id }, { transaction });
        console.log('Asignación creada:', asignacion);

        // Confirmar la transacción
        await transaction.commit();
        console.log('Transacción confirmada');

        res.json(asignacion);
    } catch (error) {
        // Revertir la transacción en caso de error
        await transaction.rollback();
        console.error('Error al asignar incidencia:', error);
        res.status(500).send('Error interno del servidor');
    }
};


exports.asignar_roles_a_usuario = async (req, res) => {
    const { cn_id_usuario, roles } = req.body;
    console.log('Datos recibidos:', req.body);
    if (!cn_id_usuario || !roles || !Array.isArray(roles) || roles.length === 0) {
        return res.status(400).send({ message: 'Usuario o roles no proporcionados o formato incorrecto.' });
    }

    try {
        // Obtiene los roles existentes para el usuario
        const existingRoles = await Roles_Usuario.findAll({
            where: {
                cn_id_usuario,
                cn_id_rol: {
                    [Op.in]: roles
                }
            }
        });

        // Filtra los roles que ya existen
        const existingRoleIds = existingRoles.map(role => role.cn_id_rol);
        const rolesToInsert = roles
            .filter(role => !existingRoleIds.includes(role))
            .map(role => ({
                cn_id_usuario,
                cn_id_rol: role
            }));

        if (rolesToInsert.length > 0) {
            await Roles_Usuario.bulkCreate(rolesToInsert);
        }

        res.status(200).json({ message: 'Roles asignados correctamente.' });

    } catch (error) {
        console.error('Error al asignar roles al usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

exports.eliminar_roles_de_usuario = async (req, res) => {
    const { cn_id_usuario, cn_id_roles } = req.body;

    if (!cn_id_usuario || !Array.isArray(cn_id_roles) || cn_id_roles.length === 0) {
        return res.status(400).json({ message: 'Usuario o roles no proporcionados correctamente.' });
    }

    try {
        const result = await Roles_Usuario.destroy({
            where: {
                cn_id_usuario,
                cn_id_rol: cn_id_roles
            }
        });

        if (result === 0) {
            return res.status(404).json({ message: 'Roles no encontrados para este usuario.' });
        }

        res.status(200).json({ message: 'Roles eliminados exitosamente.' });
    } catch (error) {
        console.error('Error al eliminar los roles:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

exports.roles_por_usuario = async (req, res) => {
    const cn_id_usuario = req.params.cn_id_usuario;
    console.log(cn_id_usuario);
    if (!cn_id_usuario) {
        return res.status(400).json({ message: 'Usuario no proporcionado.' });
    }

    try {
        const usuario = await Usuarios.findOne({
            where: { cn_user_id: cn_id_usuario },
            include: [{
                model: Roles,
                as: 'roles',
                attributes: ['cn_id_rol', 'ct_descripcion']
            }]
        });

        if (!usuario) {
            return res.status(404).json({ message: 'No se encontraron roles para este usuario.' });
        }

        res.json(usuario.roles);
    } catch (error) {
        console.error('Error al obtener roles por usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
}

