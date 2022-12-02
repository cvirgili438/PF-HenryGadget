const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    code :{
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey:true,     
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    img : {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      unique:true,      
    },
    continente: {
      type: DataTypes.STRING,
      allowNull : false      
    },
    capital : {
      type : DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    subRegion: {
      type : DataTypes.STRING,

    },
    area: {
      type: DataTypes.FLOAT,
      
    },
    poblacion : {
      type: DataTypes.INTEGER,
    },   
  },{timestamps: false});
};
