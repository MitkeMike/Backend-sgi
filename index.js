// Importación de módulos necesarios
const express = require('express');
const cors = require('cors'); 
require('dotenv').config();
const auth_routes = require('./routes/auth_routes'); 
const usuarioRoutes = require('./routes/usuarioRoutes'); 
const incidenciaRoutes = require('./routes/incidencia_routes'); 
const diagnosticosRoutes = require('./routes/diagnosticos_routes'); 
const admin_routes = require('./routes/admin_routes');
const sequelize = require('./database');

const Roles = require('./models/Roles');
const Pantallas = require('./models/Pantallas');

// Creación de la aplicación Express
const app = express();
const port = process.env.PORT;

// Habilitar CORS para todas las solicitudes
app.use(cors({ origin: '*' }));

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Define la función de sincronización de la base de datos
const syncDatabase = async () => {
    try {
        // Sincroniza todos los modelos en el orden correcto
        await sequelize.sync({ alter: true });
        console.log("Database synchronized successfully.");
    } catch (error) {
        console.error("Database sync failed:", error);
    }
};

// Llama a la función de sincronización de la base de datos
syncDatabase();

// Inicia el servidor en el puerto especificado
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Rutas de la aplicación
app.use('/auth', auth_routes); // Rutas de autenticación
app.use('/admin', admin_routes); // Rutas de administración
app.use('/usuarios', usuarioRoutes); // Rutas de usuarios
app.use('/incidencias', incidenciaRoutes); // Rutas de incidencias
app.use('/diagnosticos', diagnosticosRoutes); // Rutas de diagnósticos

// Exporta la aplicación para su uso en otros módulos
module.exports = app;
