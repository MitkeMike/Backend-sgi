const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const Roles = sequelize.define('Roles', {
    cn_id_rol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ct_descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cn_id_sistema: {
        type: DataTypes.INTEGER,
        references: {
            model: 't_sistema',
            key: 'cn_id_sistema'
        },
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 't_roles'
})

module.exports = Roles;