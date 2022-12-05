const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmpty(string) {
          const validation = [...string].filter(e => e !== ' ').length === 0
          if (validation) {
            throw new Error('Name cannot be empty!')
          }
        }
      }
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    model: {
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
      type: DataTypes.TEXT,
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
    img: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },

  },
    {
      timestamps: true,
      createdAt: 'created',
      updatedAt: 'updated',
      paranoid: true,
    });
};
