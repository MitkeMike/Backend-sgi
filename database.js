// Configuración de la conexión a la base de datos con Sequelize
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

// Crear una instancia de Sequelize para conectar a la base de datos MySQL
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, '', {
    host: process.env.DB_HOST,  // Host de la base de datos
    dialect: 'mysql'            // Tipo de base de datos
});

// Autenticar la conexión a la base de datos
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');  // Mensaje de éxito en la conexión
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);    // Mensaje de error en la conexión
    });

// Exportar la instancia de Sequelize para usarla en otros archivos
module.exports = sequelize;
