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


const app = express();
const port = process.env.PORT;

app.use(cors({ origin: '*' }));
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use('/auth', auth_routes);
app.use('/admin', admin_routes);
app.use('/usuarios', usuarioRoutes);
app.use('/incidencias', incidenciaRoutes);
app.use('/diagnosticos', diagnosticosRoutes);

module.exports = app;
