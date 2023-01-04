const {DataTypes} = require('sequelize');

module.exports = sequelize => {
    sequelize.define('product_order', {
        id :{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,     
          },
        quantity: {
            type: DataTypes.INTEGER,
        }
    })
}