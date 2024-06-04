const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const Riesgos = sequelize.define('Riesgos', {
    cn_id_riesgo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ct_descripcion_riesgo: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 't_riesgos'
})
module.exports = Riesgos;