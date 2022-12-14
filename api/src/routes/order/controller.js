const { User, Cart, Product, Product_cart } = require('../../db.js');
const { Op } = require('sequelize');

module.exports = {
    deleteStock: async (idProduct, idCart) => {
        try {
            const product = await Product.findByPk(idProduct);
            const productCart = await Product_cart.findOne({where: {                                               // Buscamos si el producto pasado por id ya existe en el carrito de ese usuario, si no existe productExist sera null si existe pues guardara la instancia de Product_cart
                [Op.and]: [{productId: product.id}, {cartId: idCart}]
             }});
             
            if(!product || !productCart) throw new Error('Product or cart was not found')
            await Product.update({stock: product.stock - productCart.quantity}, {where: {id: product.id}});
            return true;
        } catch (error) {
            throw new Error(error);
        }
    }
}