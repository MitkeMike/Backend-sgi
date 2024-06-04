const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const Asignacion_incidencia = sequelize.define('Asignacion_incidencia', {
    cn_id_asignacion_incidencia: {
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
    cn_id_usuario: {
        type: DataTypes.INTEGER,
        references: {
            model: 't_usuarios',
            key: 'cn_id_usuario'
        },
        allowNull: false
    },
    cn_cantidad_tecnicos: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    }, {
        timestamps: false,
        tableName: 't_asignacion_incidencia'
    })

    module.exports = Asignacion_incidencia;