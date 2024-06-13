const Incidencias = require('../models/Incidencias');
const Imagenes = require('../models/Imagenes');
const Asignacion_incidencias = require('../models/Asignacion_incidencia');
const multer = require('multer');
const sequelize = require('../database');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('img');

exports.obtener_todas_Incidencias = async (req, res) => {
    try {
        const incidencias = await Incidencias.findAll({
            include: [
                {
                    model: Imagenes,
                    as: 'imagen',
                    attributes: ['cn_id_img', 'img']
                }
            ]
        });

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
    upload(req, res, async (err) => {
        if (err) {
            console.error('Error al subir la imagen con multer:', err);
            return res.status(400).json({ message: 'Error al subir la imagen' });
        }

        const imagen = req.file;
        const incidencia = req.body;

        try {
            const t = await sequelize.transaction();

            try {
                let nuevaImagen = null;

                if (imagen) {
                    console.log('Imagen recibida:', imagen);
                    //Se carga la imagen en la base de datos
                    nuevaImagen = await Imagenes.create(
                        { img: imagen.buffer },
                        { transaction: t }
                    );
                    console.log('Imagen guardada en la base de datos:', nuevaImagen);
                }

                if (nuevaImagen) {
                    //Pasamos el id de la imagen a la incidencia
                    incidencia.cn_id_img_incidencia = nuevaImagen.cn_id_img;
                }

                //Creamos la incidencia
                const nuevaIncidencia = await Incidencias.create(incidencia, { transaction: t });
                console.log('Incidencia creada:', nuevaIncidencia);

                //Confirmamos la transacción
                await t.commit();

                res.json(nuevaIncidencia);
            } catch (error) {
                //Se revierte la transaccion
                await t.rollback();
                console.error('Error al crear incidencia dentro de la transacción:', error);
                res.status(500).send('Error interno del servidor');
            }
        } catch (error) {
            console.error('Error al crear incidencia:', error);
            res.status(500).send('Error interno del servidor');
        }
    });
};

exports.actualizar_Incidencia = async (req, res) => {
    const { ct_cod_incidencia, cn_user_id, afectacion, categoria, estado, riesgo, prioridad } = req.body;

    try {
        const t = await sequelize.transaction();

        try {
            // Actualizar los campos en la tabla de incidencias
            const [affectedRows] = await Incidencias.update({
                cn_id_afectacion: afectacion,
                cn_id_categoria: categoria,
                cn_id_estado: estado,
                cn_id_riesgo: riesgo,
                cn_id_prioridad: prioridad
            }, {
                where: { ct_cod_incidencia: ct_cod_incidencia },
                transaction: t
            });

            if (affectedRows === 0) {
                throw new Error('No se encontró la incidencia para actualizar');
            }

            // Inserción en la tabla de asignación de incidencias
            await Asignacion_incidencias.create({
                ct_cod_incidencia: ct_cod_incidencia,
                cn_user_id: cn_user_id
            }, { transaction: t });

            // Confirmamos la transacción
            await t.commit();

            res.json({ message: 'Incidencia actualizada e inserción realizada con éxito' });
        } catch (error) {
            // Se revierte la transacción
            await t.rollback();
            console.error('Error al actualizar e insertar:', error);
            res.status(500).json({ message: 'Error interno del servidor', error: error.message });
        }
    } catch (error) {
        console.error('Error al actualizar e insertar:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

