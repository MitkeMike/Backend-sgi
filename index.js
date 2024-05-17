const express = require('express');
const usuariosRoutes = require('./routes/usuarioRoutes');
const sequelize = require('./database');

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use(express.json());

sequelize.sync({ force: false }).then(() => {
    console.log('Database sync');
}).catch(error => {
    console.error('Database sync failed:', error);
});

app.use('/usuarios', usuariosRoutes);

module.exports = app;