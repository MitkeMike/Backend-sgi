const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const Departamento = sequelize.define('Departamento', {
    ct_cod_departamento: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    ct_descripcion_departamento: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 't_departamento'
})
module.exports = Departamento;