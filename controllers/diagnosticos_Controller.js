const Diagnosticos = require('../models/Diagnosticos');

exports.obtener_todos_Diagnosticos = async (req, res) => {
    try {
        const diagnosticos = await Diagnosticos.findAll();

        if (diagnosticos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron diagnosticos' });
        }

        res.json(diagnosticos);
    } catch (error) {
        console.error('Error al obtener diagnosticos:', error);
        res.status(500).send('Error interno del servidor');
    }
}

exports.crear_Diagnostico = async (req, res) => {
    try {
        const diagnostico = req.body;
        await Diagnosticos.create(diagnostico);
        res.json(diagnostico);
    } catch (error) {
        console.error('Error al crear diagnostico:', error);
        res.status(500).send('Error interno del servidor');
    }
}