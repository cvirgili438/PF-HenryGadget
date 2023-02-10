const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('campaign', {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        contacts: {
          type: DataTypes.BIGINT,
          defaultValue: 0,
        },
        rating: {
          type: DataTypes.ENUM('0', '1', '2', '3', '4', '5'),
          defaultValue: '0',
        },
        published: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        archived: {
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