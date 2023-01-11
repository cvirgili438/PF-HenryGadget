const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('address', {
    id :{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true,     
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'postal_code'
    },  
    type: {
      type: DataTypes.ENUM('billing','shipping'),
      allowNull: false
    },
    principal: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },{
    timestamps: true,
    createdAt: 'created',
    updatedAt: 'updated',
    paranoid: true,
  });
};
