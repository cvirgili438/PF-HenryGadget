const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('newsletter', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        code: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        confirm: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
        {
            timestamps: true,
            createdAt: 'created',
            updatedAt: 'updated',
            paranoid: true,
        });
};