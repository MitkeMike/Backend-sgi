const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const Roles_Usuario = sequelize.define('Roles_Usuario', {
    cn_id_rol: {
        type: DataTypes.INTEGER,
        references: {
            model: 't_roles',
            key: 'cn_id_rol'
        },
    },
    cn_id_usuario: {
        type: DataTypes.INTEGER,
        references: {
            model: 't_usuarios',
            key: 'cn_user_id'
        },
    }
}, {
    timestamps: false,
    tableName: 't_roles_por_usuario'
})
module.exports = Roles_Usuario;