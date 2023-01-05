
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('review', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    score: {
      type: DataTypes.ENUM('0.5', '1', '1.5', '2', '2.5','3', '3.5', '4', '4.5', '5'),
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    visible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
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

