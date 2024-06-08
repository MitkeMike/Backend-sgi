const express = require('express');
const cors = require('cors'); // Importa cors
require('dotenv').config();
const auth_routes = require('./routes/auth_routes'); 
const usuarioRoutes = require('./routes/usuarioRoutes'); 
const incidenciaRoutes = require('./routes/incidencia_routes'); 
const diagnosticosRoutes = require('./routes/diagnosticos_routes'); 
const admin_routes = require('./routes/admin_routes');
const sequelize = require('./database');

const app = express();
const port = process.env.PORT;

// Usa cors para permitir solicitudes de cualquier origen
app.use(cors({
    origin: '*'
}));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use(express.json());

sequelize.sync({ force: false }).then(() => {
    console.log('Database sync');
}).catch(error => {
    console.error('Database sync failed:', error);
});
app.use('/auth', auth_routes);
app.use('/admin', admin_routes);
app.use('/usuarios', usuarioRoutes);
app.use('/incidencias', incidenciaRoutes);
app.use('/diagnosticos', diagnosticosRoutes);

module.exports = app;
