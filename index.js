const express = require('express');
const cors = require('cors'); // Importa cors
const usuarioRoutes = require('./routes/usuarioRoutes'); // Asegúrate de que el nombre del archivo sea correcto
const incidenciaRoutes = require('./routes/incidencia_routes'); // Asegúrate de que el nombre del archivo sea correcto
const diagnosticosRoutes = require('./routes/diagnosticos_routes'); // Asegúrate de que el nombre del archivo sea correcto
const sequelize = require('./database');

const app = express();
const port = 3000;

// Usa cors para permitir solicitudes de cualquier origen
app.use(cors());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use(express.json());

sequelize.sync({ force: false }).then(() => {
    console.log('Database sync');
}).catch(error => {
    console.error('Database sync failed:', error);
});

app.use('/usuarios', usuarioRoutes);
app.use('/incidencias', incidenciaRoutes);
app.use('/diagnosticos', diagnosticosRoutes);

module.exports = app;
