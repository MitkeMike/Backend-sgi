const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const Categorias = sequelize.define('Categorias', {
    cn_id_categoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ct_descripcion_categoria: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 't_categorias'
})
module.exports = Categorias;