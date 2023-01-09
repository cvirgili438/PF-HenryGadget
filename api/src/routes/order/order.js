const { Router } = require('express');
const { Op } = require("sequelize");
const router = Router();

const { Order, User, Cart, Product, Product_cart, Product_order } = require('../../db.js');
const { deleteStock } = require('./controller.js');


router.get('/', async(req,res) => {                                                             // localhost:3001/orders (get)
    const {idUser} = req.query;                                                                  // Requerimos el id del usuario por body
    
    if(!idUser) return res.status(404).json({err: 'User id is missing'});                       // Validamos que si nos pasen el id del usuario
    
    try {
        const user = await User.findByPk(idUser);                                               // Buscamos al usuario por el id pasado
        
        if(!user) return res.status(404).json({err: `User with id: ${idUser} doesn't exist`});  // Validamos que el usuario exista sino devolvemos mensaje de error apropiado

        const orders = await Order.findAll({where: {userUid: idUser},include: Product});        // Buscamos toda orden que tenga como userUid el id del usuario pasado por body, incluimos productos tambien

        orders.length === 0                                                                     // Validamos que el query anterior haya encontrado alguna orden, si si devolvemos las ordenes encontradas, sino devolvemmos mensaje de error apropiado
        ? res.status(404).json({err: `User with id: ${idUser} doesn't have any orders`})
        : res.status(200).json({msg: `Order from user with id: ${idUser}`, orders});
    } catch (error) {
        res.status(400).json({err: 'An error ocurred in database', err: error})
    }
})

router.post('/', async (req,res) => {                                                                               // localhost:3001/orders (post) !! SE ENTIENDE QUE PARA ESTA PARTE EL CARRITO YA SE PAGO !!
    const {idUser} = req.body;                                                                                      // Requerimos el id del usuario por body

    if(!idUser) return res.status(400).json({err: 'User id is missing'});                                           // Validamos que nos hayan pasado el id solicitado

    try {
        const user = await User.findByPk(idUser, {include: Cart});                                                  // Con el id del usuario buscamos al usuario y su carrito(si este existe).
        const userCart = await Cart.findByPk(user.cart.id, {include: Product});                                     // Con el id del carrito encontrado en el user.cart buscamos el carrito incluyendo los productos en el. 
        const products = userCart.products                                                                          // Guardamos los productos en una variable.

        if(!user) return res.status(404).json({err: `The user with id: ${idUser} doesn't exist`});                  // Validamos que existan tanto usuario como que el usuario tiene carrito 
        if(!userCart) return res.status(404).json({err: `The user with id: ${idUser} doesn't have an active cart`})

        const newOrder = await Order.create({status: 'processing', trackingNumber: 0, total: userCart.total})                          // Creamos una orden y la inicializamos con estado 'proccesing' es el estado inicial de toda orden y el total lo seteamos del total del carrito ya existente del usuario
        await user.addOrder(newOrder.id)                                                                            // Vinculamos esa nueva orden con el usuario 

        for (const product of products) {       
            const idProduct = product.id    
            const quantity = product.product_cart.quantity;                                                                     // Iteramos sobre los productos del carrito 
            const productToAdd = await Product.findByPk(product.id);                                                // Buscamos el producto por su id para tener toda su informacion
            await newOrder.addProduct(productToAdd);                                                                // y vinculamos cada producto a la orden anteriormente creada
            await Product_order.update({ quantity: quantity }, { where: { productId: idProduct } });
       
            await deleteStock(idProduct, userCart.id);                                                              // Eliminamos el stock dependiendo de la cantidad de productos comprada
        };

        const deletedCart = await Cart.destroy({where: {id: userCart.id}});                                         // En esta instancia ya tendremos la orden creada vinculada al usuario con total traido del carrito y todos los mismos productos que tenia el carrito, nos quedaria eliminar el carrito para que ya simplemente quede la orden.

        const result = await Order.findByPk(newOrder.id, {include: Product});                                       // Enviamos msg de confirmacion apropiado
        res.status(200).json({msg: 'Order created succesfuly', order: result});
    } catch (error) {
        res.status(400).json({err: 'An error happened in database', err: error});
    }
})

// router.put('/', async(req,res) => {                                                                       // localhost:3001/orders (put)
//     const {idOrder, status, trackingNumber} = req.body;                                                                   //

//     if(!idOrder) return res.status(400).json({err: "Order id is missing"});

//     try {
//         const orderExist = await Order.findByPk(idOrder);
//         if(!orderExist) return res.status(404).json({err: `The order with id: ${idOrder} doesn't exist`});

//         let newData = {};
//         if (status)
//             newData = { status };
//         if (trackingNumber)
//             newData = { ...newData, trackingNumber };

//         await Order.update(newData, { where: { id: idOrder } });

//         const result = await Order.findByPk(idOrder)
//         res.status(200).json({msg: 'The order was updated succesfuly', order: result})
//     } catch (error) {
//         res.status(400).json({err: 'An error ocurred in database', err: error})
//     }
// })

// router.delete('/', async(req,res) => {                                              // localhost:3001/orders (delete)
//     const {idOrder} = req.body;                                                     // Requerimos el id de la orden a eliminar por body

//     if(!idOrder)return res.status(400).json({err: 'Order id is missing'});          // Verificamos que hayan pasado idOrder

//     try {
//         const orderExist = await Order.findByPk(idOrder);                           // Buscamos la orden por id para verificar que si exista

//         if(!orderExist){                                                            // En caso de que no exista lo notificamos
//             res.status(404).json({err: `The order with id: ${idOrder} doesn't exist`});
//             return;
//         }
        
//         const deleteOrder = await Order.destroy({where: {id: idOrder}});             // En caso de que si exista simplemente la eliminamos y devolvemos mensaje apropiado
//         res.status(200).json({msg: 'Order deleted succesfuly', order: deleteOrder});
//         return;
//     } catch (error) {
//         res.status(400).json({err: 'Error happened in database', err: error})
//     }
// })

module.exports = router;