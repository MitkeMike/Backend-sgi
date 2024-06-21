const Bitacora_Cambios_Estados = require('../models/Bitacora_Cambios_Estados');

/**
 * Registra un cambio de estado en la bitácora.
 * @param {number} cn_id_estado - ID del nuevo estado.
 * @param {number} cn_id_usuario - ID del usuario que realiza el cambio.
 * @param {string} ct_referencia - Referencia del cambio (puede ser un comentario o una referencia adicional).
 * @param {Object} transaction - La transacción de la base de datos para asegurar la atomicidad.
 * @throws {Error} Lanza un error si ocurre algún problema durante el registro en la bitácora.
 */
const registrar_bitacora = async (cn_id_estado, cn_id_usuario, ct_referencia, transaction) => {
  try {
    await Bitacora_Cambios_Estados.create({
      cn_id_estado,
      cn_id_usuario,
      ct_referencia
    }, { transaction });
  } catch (error) {
    console.error('Error al registrar en la bitácora:', error);
    throw error; // Lanza el error para que la transacción principal pueda manejarlo
  }
};

module.exports = {
    registrar_bitacora
};
