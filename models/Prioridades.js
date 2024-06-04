const sequelize = ('../database');
const { DataTypes } = require('sequelize');

const Prioridades = sequelize.define('Prioridades', {
    cn_id_prioridad: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ct_descripcion_prioridad: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 't_prioridades'
})
module.exports = Prioridades;