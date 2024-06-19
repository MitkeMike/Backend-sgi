const Incidencias = require('../models/Incidencias');
const Imagenes = require('../models/Imagenes');
const Asignacion_incidencias = require('../models/Asignacion_incidencia');
const multer = require('multer');
const sequelize = require('../database');
const { Op } = require('sequelize');

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
                    // Se carga la imagen en la base de datos
                    nuevaImagen = await Imagenes.create(
                        { img: imagen.buffer },
                        { transaction: t }
                    );
                }

                if (nuevaImagen) {
                    // Pasamos el id de la imagen a la incidencia
                    incidencia.cn_id_img_incidencia = nuevaImagen.cn_id_img;
                }

                // Establecemos el estado de la incidencia en 1 (Registrado)
                incidencia.cn_id_estado = 1;

                // Creamos la incidencia
                const nuevaIncidencia = await Incidencias.create(incidencia, { transaction: t });

                // Confirmamos la transacción
                await t.commit();

                res.json(nuevaIncidencia);
            } catch (error) {
                // Se revierte la transacción
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
            // Obtener la incidencia
            const incidencia = await Incidencias.findOne({ where: { ct_cod_incidencia: ct_cod_incidencia }, transaction: t });
            
            if (!incidencia) {
                throw new Error('No se encontró la incidencia para actualizar');
            }

            // Verificar y actualizar el estado de la incidencia
            if (incidencia.cn_id_estado === 1) { // 1 significa "registrado"
                incidencia.cn_id_estado = 2; // 2 significa "asignado"
                console.log('Actualizando el estado a "asignado"');
            }

            // Actualizar los campos en la tabla de incidencias
            const [affectedRows] = await Incidencias.update({
                cn_id_afectacion: afectacion,
                cn_id_categoria: categoria,
                cn_id_estado: incidencia.cn_id_estado, // Usar el estado actualizado
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

exports.buscar_incidencia = async (req, res) => {
    const { ct_cod_incidencia, ct_titulo_incidencia } = req.body;

    try {
        const whereCondition = {};
        if (ct_cod_incidencia) {
            whereCondition.ct_cod_incidencia = { [Op.like]: `%${ct_cod_incidencia}%` };
        }
        if (ct_titulo_incidencia) {
            whereCondition.ct_titulo_incidencia = { [Op.like]: `%${ct_titulo_incidencia}%` };
        }
        const incidencias = await Incidencias.findAll({
            where: {
                [Op.or]: whereCondition
            },
            include: [
                {
                    model: Imagenes,
                    as: 'imagen',
                    attributes: ['cn_id_img', 'img']
                }
            ]
        });

        if (!incidencias || incidencias.length === 0) {
            return res.status(404).json({ message: 'No se encontraron incidencias' });
        }

        res.json(incidencias);
    } catch (error) {
        console.error('Error al buscar incidencias:', error);
        res.status(500).send('Error interno del servidor');
    }
}

const estadosValidos = [
    { id: 1, descripcion: 'Registrado' },
    { id: 2, descripcion: 'Asignado' },
    { id: 3, descripcion: 'En Revisión' },
    { id: 4, descripcion: 'En Reparación' },
    { id: 6, descripcion: 'Terminado' },
    { id: 7, descripcion: 'Aprobado' }
];

exports.obtener_estado_incidencia = async (req, res) => {
    try {
        const ct_cod_incidencia = req.params.ct_cod_incidencia;

        // Obtener la incidencia
        const incidencia = await Incidencias.findOne({ where: { ct_cod_incidencia } });

        if (!incidencia) {
            return res.status(404).send('Incidencia no encontrada');
        }

        const estadoActual = incidencia.cn_id_estado;
        let estadoSiguiente = null;

        // Encontrar el estado siguiente
        const indexEstadoActual = estadosValidos.findIndex(estado => estado.id === estadoActual);
        if (indexEstadoActual !== -1 && indexEstadoActual < estadosValidos.length - 1) {
            estadoSiguiente = estadosValidos[indexEstadoActual + 1];
        }

        res.json({
            estadoActual: estadosValidos[indexEstadoActual]?.descripcion || 'Desconocido',
            estadoSiguiente: estadoSiguiente?.descripcion || 'Ninguno'
        });
    } catch (error) {
        console.error('Error al obtener el estado de la incidencia:', error);
        res.status(500).send('Error interno del servidor');
    }
};


exports.cambiar_estado_incidencia = async (req, res) => {
    try {
        const { ct_cod_incidencia, nuevo_estado } = req.body;

        // Buscar el nuevo estado en la lista de estados válidos
        const estadoValido = estadosValidos.find(estado => estado.descripcion === nuevo_estado);

        if (!estadoValido) {
            return res.status(400).send('Estado inválido');
        }

        // Obtener la incidencia
        const incidencia = await Incidencias.findOne({ where: { ct_cod_incidencia } });

        if (!incidencia) {
            return res.status(404).send('Incidencia no encontrada');
        }

        // Actualizar el estado de la incidencia
        incidencia.cn_id_estado = estadoValido.id;
        await incidencia.save();

        res.json({ message: 'Estado de la incidencia actualizado exitosamente', incidencia });
    } catch (error) {
        console.error('Error al cambiar el estado de la incidencia:', error);
        res.status(500).send('Error interno del servidor');
    }
};
