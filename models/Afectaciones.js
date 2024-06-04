const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const Afectaciones = sequelize.define('Afectaciones', {
    cn_id_afectacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ct_descripcion_afectacion: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 't_afectaciones'
})

module.exports = Afectaciones;