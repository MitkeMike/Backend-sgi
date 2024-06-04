const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const Pantallas = sequelize.define('Pantallas', {
    cn_id_pantalla: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ct_titulo_pantalla: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cn_id_rol: {
        type: DataTypes.INTEGER,
        references: {
            model: 't_roles',
            key: 'cn_id_rol'
        },
        allowNull: false
    },
}, {
    timestamps: false,
    tableName: 't_pantallas'
})
module.exports = Pantallas;