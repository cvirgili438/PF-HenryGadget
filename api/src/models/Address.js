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
    street: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmpty(string) {
          const validation = [...string].filter(e => e !== ' ').length === 0
          if (validation) {
            throw new Error('Street cannot be empty!')
          }
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmpty(string) {
          const validation = [...string].filter(e => e !== ' ').length === 0
          if (validation) {
            throw new Error('City cannot be empty!')
          }
        }
      }
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmpty(string) {
          const validation = [...string].filter(e => e !== ' ').length === 0
          if (validation) {
            throw new Error('Region cannot be empty!')
          }
        }
      }
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'postal_code'
    },      
  },{
    timestamps: true,
    createdAt: 'created',
    updatedAt: 'updated',
    paranoid: true,
  });
};
