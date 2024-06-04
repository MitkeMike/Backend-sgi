const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const Estados = sequelize.define('Estados', {
    cn_id_estado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ct_descripcion_estado: {
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
    tableName: 't_estados'
})
module.exports = Estados;