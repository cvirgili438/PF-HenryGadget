const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('user', {
    uid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    rol: {
      type: DataTypes.ENUM('admin', 'client'),
      allowNull: true,
      defaultValue: 'client'
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: 'updated',
    paranoid: true,
  });
};

