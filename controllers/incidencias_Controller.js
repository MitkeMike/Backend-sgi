const Incidencias = require('../models/Incidencias');

exports.obtener_todas_Incidencias = async (req, res) => {
    try {
        const incidencias = await Incidencias.findAll();
        
        if (incidencias.length === 0) {
            return res.status(404).json({ message: 'No se encontraron incidencias' });
        }

        res.json(incidencias);
    } catch (error) {
        console.error('Error al obtener incidencias:', error);
        res.status(500).send('Error interno del servidor');
    }
};

exports.crear_Incidencia = async (req, res) => {
    try {
        const incidencia = req.body;
        await Incidencias.create(incidencia);
        res.json(incidencia);
    } catch (error) {
        console.error('Error al crear incidencia:', error);
        res.status(500).send('Error interno del servidor');
    }
}