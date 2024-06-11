const sequelize = require('../database');
const Usuarios = require('./Usuarios');
const Roles = require('./Roles');
const Roles_Usuario = require('./Roles_Usuario');


Usuarios.belongsToMany(Roles, { through: Roles_Usuario, foreignKey: 'cn_id_usuario' });
Roles.belongsToMany(Usuarios, { through: Roles_Usuario, foreignKey: 'cn_id_rol' });

module.exports = {
    Usuarios,
    Roles,
    Roles_Usuario
};