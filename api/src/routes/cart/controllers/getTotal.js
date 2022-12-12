const { Product_cart } = require('../../../db.js');
const { Op } = require("sequelize");

module.exports = async (products, idCart) => {                      // Proposito de la funcion calcular el total del carriot
    const prices = []                                               // Un pequeño array donde guardaremos el precio final de cada producto teniendo en cuenta la cantidad

    for (const product of products) {                               // Un for of para iterar sobre products(los productos pasados desde la ruta), estos productos son todos los productos que existen en el carrito
        const productExist = await Product_cart.findOne({where: {   // Aqui lo que hacemos es traer la instancia de product_cart que es donde tenemos la propiedad quantity.
            [Op.and]: [{productId: product.id}, {cartId: idCart}]
        }})

        prices.push(product.price * productExist.quantity)          // asi que al final lo que haremos es tomar el precio del producto y multiplicarlo por cantidad y ese valor guardarlo en nuestro array de prices, recordemos que este precio pusheado es el de un producto 
    }

    return prices.reduce((acc,curr) => acc + curr);                 // cuando ya termino de sacar el calculo de cada uno de los productos individualmente, simplemente con un reduce sumaremos todo eso para sacar el valor final
}