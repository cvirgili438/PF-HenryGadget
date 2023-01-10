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
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      // validate: {
      //     isEmail: true
      // },
      defaultValue: 'n/d'
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'n/d'
    },
    rol: {
      type: DataTypes.ENUM('admin', 'client'),
      allowNull: true,
      defaultValue: 'client'
    },
    photoURL: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'https://freepngimg.com/thumb/google/66726-customer-account-google-service-button-search-logo.png'
    },
    forceNewPassword: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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

