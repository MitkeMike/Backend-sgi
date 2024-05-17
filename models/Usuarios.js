const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Usuario = sequelize.define('Usuario', {
  cn_user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  cn_id_pantalla: {
    type: DataTypes.INTEGER,
    references: {
      model: 't_pantallas', // Nombre de la tabla referenciada
      key: 'cn_id_pantalla'
    }
  },
  ct_nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ct_cedula: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ct_puesto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cn_id_departamento: {
    type: DataTypes.STRING,
    references: {
      model: 't_departamento', // Nombre de la tabla referenciada
      key: 'ct_cod_departamento'
    }
  },
  ct_correo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ct_password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 't_usuarios',
  timestamps: false
});

module.exports = Usuario;
