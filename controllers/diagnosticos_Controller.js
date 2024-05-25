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

exports.obtener_diagnostico_por_id = async (req, res) => {
    const ct_cod_incidencia = req.params.ct_cod_incidencia;

    try {
        const diagnosticos = await Diagnosticos.findAll({
            where: { ct_cod_incidencia: ct_cod_incidencia }
        });

        if (diagnosticos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron diagnósticos para esta incidencia' });
        }

        res.json(diagnosticos);
    } catch (error) {
        console.error('Error al obtener diagnostico:', error);
        res.status(500).send('Error interno del servidor');
    }
}

exports.crear_Diagnostico = async (req, res) => {
    try {
        const diagnostico = req.body;
        if (!diagnostico.ct_cod_incidencia) {
            return res.status(400).json({ message: 'El código de la incidencia es requerido' });
        }
        await Diagnosticos.create(diagnostico);
        res.json(diagnostico);
    } catch (error) {
        console.error('Error al crear diagnostico:', error);
        res.status(500).send('Error interno del servidor');
    }
}
