const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
    id :{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true,     
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    camera: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    storage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    processor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    discount: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    img : {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,     
    },
       
  },{
    timestamps: true,
    createdAt: 'created',
    updatedAt: 'updated'
  });
};
