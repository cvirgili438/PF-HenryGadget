
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('location', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    // score: {
    //   type: DataTypes.ENUM('0', '1', '2', '3', '4', '5'),
    //   defaultValue: '0'
    // },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    lat: {
      type: DataTypes.REAL,
      allowNull: true
    },
    lon: {
      type: DataTypes.REAL,
      allowNull: true
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

