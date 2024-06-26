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
            model: 't_incidencias', // Debe coincidir con el nombre de la tabla en la base de datos
            key: 'ct_cod_incidencia'
        },
        allowNull: false
    },
    cn_user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 't_usuarios', // Debe coincidir con el nombre de la tabla en la base de datos
            key: 'cn_user_id'
        },
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 't_asignacion_incidencia'
});

module.exports = Asignacion_incidencia;
