const Bitacora_Cambios_Estados = require('../models/Bitacora_Cambios_Estados');

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
