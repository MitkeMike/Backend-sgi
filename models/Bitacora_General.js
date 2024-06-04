const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const Bitacora_General = sequelize.define('Bitacora_General', {
    cn_cod_bitacora: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ct_cod_incidencia: {
        type: DataTypes.STRING,
        references: {
            model: 't_incidencias',
            key: 'ct_cod_incidencia'
        },
        allowNull: false
    },
    cn_id_estado_nuevo: {
        type: DataTypes.INTEGER,
        references: {
            model: 't_estados',
            key: 'cn_id_estado'
        },
        allowNull: false
    },
    cn_id_usuario: {
        type: DataTypes.INTEGER,
        references: {
            model: 't_usuarios',
            key: 'cn_id_usuario'
        },
        allowNull: false
    },
    cn_id_pantalla: {
        type: DataTypes.INTEGER,
        references: {
            model: 't_pantallas',
            key: 'cn_id_pantalla'
        },
        allowNull: false
    },
    ct_referencia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cf_fecha_hora_modificacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
    }, {
        timestamps: false,
        tableName: 't_bitacora_general'
    })
module.exports = Bitacora_General;