const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const Bitacora_Cambios_Estados = sequelize.define('Bitacora_Cambios_Estados', {
    cn_cod_bitacora: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cn_id_estado: {
        type: DataTypes.INTEGER,
        references: {
            model: 't_estados',
            key: 'cn_id_estado'
        },
        allowNull: false
    },
    cn_id_usuario: {
        type: DataTypes.INTEGER,
        references: {
            model: 't_usuarios',
            key: 'cn_id_usuario'
        },
        allowNull: false
    },
    ct_referencia: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: false,
    tableName: 't_bitacora_cambios_estados'
})
module.exports = Bitacora_Cambios_Estados;