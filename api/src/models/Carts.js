const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('cart', {
    id :{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true,     
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }    
  },
  {
    timestamps: true,
    createdAt: 'created',
    updatedAt: 'updated',
    paranoid: true,
  });
};
