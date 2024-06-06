const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Imagenes = require('./Imagenes');

const Diagnosticos = sequelize.define('Diagnosticos', {
    ct_id_diagnostico: {
        type: DataTypes.STRING,
        primaryKey: true,
        validate: {
            // Formato
            is: /^[0-9]{4}-[0-9]{7}$/
        }
    },
    ct_cod_incidencia: {
        type: DataTypes.STRING,
        references: {
            model: 't_incidencias',
            key: 'ct_cod_incidencia'
        },
        allowNull: false
    },
    cn_user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 't_usuarios',
            key: 'cn_user_id'
        },
        allowNull: false
    },
    cf_fecha_hora_realizado: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    ct_descripcion_diagnostico: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cn_tiempo_estimado_solucion: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    ct_observaciones: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cn_id_img_diagnostico: {
        type: DataTypes.INTEGER,
        references: {
            model: 't_imagenes',
            key: 'cn_id_img'
        },
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 't_diagnosticos',
    hooks: {
        beforeCreate: async (diagnostico) => {
            const year = new Date().getFullYear();
            const t = await sequelize.transaction();

            try {
                // Obtener el último diagnóstico creado en el año actual
                const lastDiagnostico = await Diagnosticos.findOne({
                    where: sequelize.where(sequelize.fn('YEAR', sequelize.col('cf_fecha_hora_realizado')), year),
                    order: [['cf_fecha_hora_realizado', 'DESC']],
                    lock: true, // Bloquear la fila para evitar concurrencia
                    transaction: t
                });

                let consecutiveNumber = 1;
                if (lastDiagnostico) {
                    const lastId = lastDiagnostico.ct_id_diagnostico;
                    const lastConsecutive = parseInt(lastId.split('-')[1]);
                    consecutiveNumber = lastConsecutive + 1;
                }

                diagnostico.ct_id_diagnostico = `${year}-${String(consecutiveNumber).padStart(7, '0')}`;

                await t.commit();
            } catch (error) {
                await t.rollback();
                throw error;
            }
        }
    }
    
}
);
Diagnosticos.belongsTo(Imagenes, {
    foreignKey: 'cn_id_img_diagnostico',
    as: 'imagen'
});

module.exports = Diagnosticos;