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
const { Op } = require('sequelize');


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
          where: { ct_descripcion: 'Técnico' },
          through: { attributes: [] } // Esto excluye los atributos de la tabla intermedia
        }
      });
  
      if (tecnicos.length === 0) {
        return res.status(404).json({ message: 'No se encontraron técnicos' });
      }
      res.json(tecnicos);
    } catch (error) {
      console.error('Error al obtener técnicos:', error);
      res.status(500).send('Error interno del servidor');
    }
  };

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

exports.asignar_roles_a_usuario = async (req, res) => {
    const { cn_id_usuario, roles } = req.body;
    console.log('Datos recibidos:', req.body);
    if(!cn_id_usuario || !roles || !Array.isArray(roles) || roles.length === 0){
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

        res.status(200).json({message: 'Roles asignados correctamente.'});

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

