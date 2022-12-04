const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('order', {
    id :{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true,     
    },
    status: {
      type: DataTypes.ENUM('paid', 'preparing', 'on route', 'delivered', 'canceled'),
      allowNull: false,
    },
    trackingNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },     
  },{
    timestamps: true,
    createdAt: 'created',
    updatedAt: 'updated'
  });
};

