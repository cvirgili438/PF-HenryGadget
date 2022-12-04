const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'first_name',
      validate: {
        isAlphanumeric: true,
        isEmpty(string) {
          const validation = [...string].filter(e => e !== ' ').length === 0
          if (validation) {
            throw new Error('First name cannot be empty!')
          }
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'last_name',
      validate: {
        isAlphanumeric: true,
        isEmpty(string) {
          const validation = [...string].filter(e => e !== ' ').length === 0
          if (validation) {
            throw new Error('Last name cannot be empty!')
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    rol: {
      type: DataTypes.ENUM('admin', 'client'),
      allowNull: true,
      defaultValue: 'client'
    },
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: 'updated',
    paranoid: true,
  });
};
