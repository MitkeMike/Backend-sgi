const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const Sistema = sequelize.define('Sistema', {
    cn_id_sistema: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ct_descripcion_sistema: {
        type: DataTypes.STRING,
        allowNull: false
    }
    }, {
        timestamps: false,
        tableName: 't_sistema'
    })
    module.exports = Sistema;