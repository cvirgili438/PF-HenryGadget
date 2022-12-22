const { Router } = require('express');
const { Op } = require("sequelize");
const router = Router();

const { User, Cart, Product, Product_cart } = require('../../db.js');
const getTotal = require('./controllers/getTotal.js');

router.get('/', async(req,res) => {                                                                         //localhost:3001/carts (get)
    const {idUser} = req.query;  
    
    if(!idUser) return res.status(400).json({err: 'user id is missing'});                                   // Pequeña validacion para asegurarnos que pasen el id solicitado
    
    try {
        const user = await User.findByPk(idUser);                                                           // Buscamos el usuario para verificar luego que si exista un usuario con ese id
        const cart = await Cart.findOne({where: {userUid: idUser}, include: Product})                        // Bucamos el carrito relacionado con ese usuario para saber si existe y tambien para luego ser pasado como respuesta para el front (este carrito incluye ya los productos)
    
        if(!user) return res.status(404).json({err: `The user with id: ${idUser} doesn't exist`})           // Pequeñas validaciones en caso de que no tenga carrito o no exista el usuario
        if(!cart){
            return res.status(404).json({err: `The user with id: ${idUser} doesn't have an active cart`})
        }

        const total = await getTotal(cart.products, cart.id);                                               // Buscamos el total del carrito, lo cual utilizamos una funcion (mayor documentacion en ./controllers/getTotal.js)
        await Cart.update({total}, {where: {id: cart.id}});                                                 // Actualizamos el carrito para tener el total correcto, tomando en cuenta cantidades de cada producto y el precio de cada uno de estos
        const result = await Cart.findOne({where: {userUid: idUser}, include: Product});                     // Volvemos a solicitar el carrito pero esta vez ya actualizado, esto es necesario ya que el anterior carrito lo utilizamos para partir 
                                                                                                            // de ahi las actualizaciones, pero esos cambios no se quedan guardados en esa variable, por ello lo busco nuevamente para luego ser enviado
        res.send(result);
    } catch (error) {
        res.status(400).json({msg: 'An error happened in our end', err: error})
    }
});


router.post('/', async(req,res) => {                                                                                //localhost:3001/carts (post)
    const {idProduct, idUser, quantity, set} = req.body;    
                                                            // Requerimos id de usuario y product y la cantidad de cuanto de ese producto.

    if(!idProduct || !idUser) return res.status(400).json({err: 'Important information is missing'});               // Validamos que nos hayan pasado todos los datos solicitados
    if(typeof Number(quantity) !== 'number') return res.status(400).json({err: 'Quantity is missing'});

    try {
        const user = await User.findByPk(idUser, {include: Cart});                                                  // Buscamos al usuario utilizando el id proporsionado e incluimos el posible carrito que tenga el usuario
        const product = await Product.findByPk(idProduct);                                                          // Buscamos el producto y lo guardamos en una variable 

        if(!user) return res.status(404).json({msg: 'User does not exist'});                                        // Pequeñas validaciones para confirmar que exista tanto el producto como el usuario con ese id.
        if(!product) return res.status(404).json({msg: 'Product does not exist'});
        
        if(user.cart) {                                                                                             // Para evitar que el codigo rompa tendremos que dividir lo que haremos en caso de que el usuario ya tenga un carrito o en el caso en que no, aqui es la division
            const userCart = user.cart;                                                                             // En el caso en que exista el carrito lo guardamos en la constante userCart
            const productExist = await Product_cart.findOne({where: {                                               // Buscamos si el producto pasado por id ya existe en el carrito de ese usuario, si no existe productExist sera null si existe pues guardara la instancia de Product_cart
                [Op.and]: [{productId: idProduct}, {cartId: userCart.id}]
             }})
            
            if(productExist && quantity === 0){                                                                     // En caso de que la cantidad pasada sea 0 querremos eliminar el producto del carrito
                await Product_cart.destroy({where: {                                                                
                    [Op.and]: [{productId: idProduct}, {cartId: userCart.id}]
                 }})
                 return res.status(200).json({msg: 'Product was deleted succesfuly'})
            }

            if(productExist){                                                                                       // Bastante intuitivo si productExist es true es porque existe y aja se hace un proceso distinto (esta situacion se dara cuando quieren actualizar la cantidad de un producto ya agregado)
                if (set) {
                    const result = await Product_cart.update({quantity: quantity}, {where: {id: productExist.id}});               // Como ya existe no lo podemos volver a asignar sino que toca actualizarlo y eso es lo que hacemos aca, le pasamos la nueva cantidad recibida
                }else{
                    const result = await Product_cart.update({quantity: productExist.quantity + quantity}, {where: {id: productExist.id}});               
                }
                res.status(200).json({msg: 'Product updated succesfully', cart: result});                           // Mensaje de confirmacion
                return;
            }


            const [{dataValues}] = await userCart.addProduct(product);                                              // Si estamos aca es porque el producto NO EXISTE en el carrito, simplemente lo añadimos y lo actualizamos para que tenga la cantidad de ese producto
            await Product_cart.update({quantity}, {where: {id: dataValues.id}});

            const result = await User.findByPk(idUser, {include: Cart});                                            // Mensaje de confirmacion
            res.status(201).json({msg: 'Cart updated succesfully with new product', cart: result});
            return;
        }
        
        const newCart = await Cart.create({total: product.price});                                                  // Si estamos aca es porque el usuario NO TIENE un carrito (primer producto agregado) asi que creamos el carrito primero que todo :))
        await user.setCart(newCart);                                                                                // Vinculamos el carrito al usuario que buscamos anteriormente por el iduser recibido

        const [{dataValues}] = await newCart.addProduct(product);                                                   // A ese nuevo carrito ya creado y ya vinculado con el usuario le añadimos el producto y actualizamos para que tenga la cantidad de ese producto
        await Product_cart.update({quantity}, {where: {id: dataValues.id}});

        const result = await User.findByPk(idUser, {include: Cart});                                                // Mensaje de confirmacion
        res.status(201).json({msg: 'Cart created succesfully and product added', cart: result});
    } catch (error) { 
        res.status(400).send({msg: "An error happened on database", err: error});
    }
});

router.delete('/', async(req,res) => {                                          // localhost:3001/carts (delete)
    const {idUser} = req.body;                                                      // Requerimos el id del usuario por body

    if(!idUser)return res.status(400).json({err: 'User id is missing'});        // Verificamos que hayan pasado idUser

    try {
        const userExist = User.findByPk(idUser);                                // Buscamos el usuarior por id para verificar que si exista

        if(!userExist){                                                         // En caso de que no exista lo notificamos
            res.status(404).json({msg: `The user with id: ${idUser} doesn't exist`});
            return;
        }
        

        const deleteCart = await Cart.destroy({where: {userUid: idUser}});      // En caso de que si exista simplemente lo eliminamos y devolvemos mensaje apropiado
        res.status(200).json({msg: 'Cart deleted succesfuly', cart: deleteCart});
        return;
    } catch (error) {
        res.status(400).json({msg: 'Error happened in database', err: error})
    }
})


module.exports = router;