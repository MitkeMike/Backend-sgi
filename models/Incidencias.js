const { DataTypes } = require('sequelize');
const  sequelize  = require('../database');

const Incidencias = sequelize.define('Incidencias',{
    ct_cod_incidencia: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    cn_user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 't_usuarios',
            key: 'cn_user_id'
        }
    },
    cf_fecha_hora_registro: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    ct_descripcion_incidencia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ct_lugar_incidencia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ct_justificacion_cierre_incidencia: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cn_tiempo_estimado_reparacion: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    cn_numero_incidente: {
        type: DataTypes.INTEGER,
        Autoincrement: true,
        allowNull: true
    },
    cn_id_estado: {
        type: DataTypes.INTEGER,
        references: {
            model: 't_estados',
            key: 'cn_id_estado'
        }
    },
    cn_id_riesgo: {
        type: DataTypes.INTEGER,
        references: {
            model: 't_riesgos',
            key: 'cn_id_riesgo'
        }
    },
    cn_id_afectacion: {
        type: DataTypes.INTEGER,
        references: {
            model: 't_afectaciones',
            key: 'cn_id_afectacion'
        }
    },
    cn_id_prioridad: {
        type: DataTypes.INTEGER,
        references: {
            model: 't_prioridades',
            key: 'cn_id_prioridad'
        }
    },
    cn_id_categoria: {
        type: DataTypes.INTEGER,
        references: {
            model: 't_categorias',
            key: 'cn_id_categoria'
        }
    },
    cn_id_img_incidencia: {
        type: DataTypes.INTEGER,
        references: {
            model: 't_imagenes',
            key: 'cn_id_img'
        }
    },
    ct_id_diagnostico: {
        type: DataTypes.STRING,
        references: {
            model: 't_diagnosticos',
            key: 'ct_id_diagnostico'
        }
    }
}, {
    tableName: 't_incidencias',
    timestamps: false
});

module.exports = Incidencias;