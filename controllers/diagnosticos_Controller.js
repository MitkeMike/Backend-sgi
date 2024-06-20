const Diagnosticos = require('../models/Diagnosticos');
const Imagenes = require('../models/Imagenes');
const multer = require('multer');
const sequelize = require('../database');
const {registrar_bitacora} = require('./bitacora_helper');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('img');

exports.obtener_todos_Diagnosticos = async (req, res) => {
    try {
        const diagnosticos = await Diagnosticos.findAll({
            include: [
                {
                    model: Imagenes,
                    as: 'imagen',
                    attributes: ['cn_id_img', 'img']
                }
            ]
        });

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
            where: { ct_cod_incidencia: ct_cod_incidencia },
            include: [
                {
                    model: Imagenes,
                    as: 'imagen',
                    attributes: ['cn_id_img', 'img']
                }
            ]
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
    upload(req, res, async (err) => {
        if (err) {
            console.error('Error al subir la imagen con multer:', err);
            return res.status(400).json({ message: 'Error al subir la imagen' });
        }

        const imagen = req.file;
        const diagnostico = req.body;

        try {
            if (!diagnostico.ct_cod_incidencia) {
                return res.status(400).json({ message: 'El código de la incidencia es requerido' });
            }
            const t = await sequelize.transaction();
            try {
                let nuevaImagen = null;
                if (imagen) {
                    console.log('Imagen recibida:', imagen);
                    nuevaImagen = await Imagenes.create(
                        { img: imagen.buffer },
                        { transaction: t }
                    );
                    console.log('Imagen guardada en la base de datos:', nuevaImagen);
                }
                if (nuevaImagen) {
                    //Pasamos el id de la imagen al nuevo diagnóstico
                    diagnostico.cn_id_img_diagnostico = nuevaImagen.cn_id_img;
                }

                const nuevoDiagnostico = await Diagnosticos.create(diagnostico, { transaction: t });
                console.log('Diagnostico creado:', nuevoDiagnostico);

                // Registrar en la bitácora
                const referencia = `Numero de incidencia=${diagnostico.ct_cod_incidencia}, Tiempo de solucion estimado=${diagnostico.tiempo_estimado}`;
                await registrar_bitacora(3, diagnostico.cn_user_id, referencia, t);

                await t.commit();
                res.json(nuevoDiagnostico);
            } catch (error) {
                await t.rollback();
                console.error('Error al crear diagnostico dentro de la transaccion:', error);
                res.status(500).send('Error interno del servidor');
            }
        } catch (error) {
            console.error('Error al crear diagnostico:', error);
            res.status(500).send('Error interno del servidor');
        }
    });
};
