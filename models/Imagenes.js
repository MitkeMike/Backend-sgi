const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const Imagenes = sequelize.define('Imagenes', {
  cn_id_img: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  img: {
    type: DataTypes.BLOB('long'),
    allowNull: false
  }
}, {
  tableName: 't_imagenes',
  timestamps: false
});

module.exports = Imagenes;
