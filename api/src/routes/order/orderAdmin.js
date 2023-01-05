const { Router } = require('express');
const router = Router();
const authWithoutAdm = require('./../middleware/authWithoutAdm')
const { Sequelize } = require("sequelize");

const { Product, Review, User, Order } = require('../../db.js');

//se pasa middleware para proteger rutas de review para creacion, modificacion o eliminacion
router.use(authWithoutAdm);

router.get('/', async (req,res)=> {                                                     // localhost:3001/reviews (get)
    //const {idProduct, idUser} = req.body;                                               // Atributos requeridos para busqueda por body

    try {
        if(!Object.keys(req.body).length) {                                             // En caso de que no nos pasen ningun parametro devolver todas las reviews
            const result = await Order.findAll({
                                                where: {archived: false},
                                                order: [['id', 'ASC']],
                                                include: [{
                                                    model: User,
                                                }]
                                                });  
            
            result.length === 0                                                         // Si no hay reviews disponibles devolvera un array vacio, se valida y muestra msg apropiado, misma logica aplica para todos los casos
            ? res.status(404).json({err: "There are no orders available."})
            : res.status(200).json({msg: 'Orders obtained successfully.', result: result});
            return
        }
    } catch (error) {
        res.status(400).json({err: error.message});
    }
})

router.put('/status/:idOrder', async (req,res) => {
    const {idOrder} = req.params;
    try { 
        const order = await Order.findByPk(idOrder);
        if(!order){
            res.status(404).json({err: `Order with id: ${idOrder} doesn't exist.`});
            return;
        }
        let orderTypes = await Order.rawAttributes.status.values;
        
        let index = orderTypes.indexOf(order.status);
        index === (orderTypes.length - 1) ? index = 0 : index++; 
        
        const orderUpdated = await Order.update({status: orderTypes[index]}, {where: {id: idOrder}});
        
        const orders = await Order.findAll({
                                            where: {archived: false},
                                            order: [['id', 'ASC']],
                                            include: [{
                                                model: User,
                                            }]
                                            });
        
        res.status(200).json({msg: `Order with id: ${idOrder} has changed status to ${orderTypes[index]}`, result: orders})
    } catch (error) {
        res.status(400).json({err: error})
    }
})

router.put('/archive/', async (req,res) => {
    const {ids} = req.body;     
    
    try { 
        const order = await Order.findAll({where: {id: {[Sequelize.Op.in]: ids}}});
        order.forEach(element => {
            if(!ids.includes(element.dataValues.id)){
                res.status(404).json({err: `Order with id: ${element.dataValues.id} doesn't exist. Cancelling operation.`});
                return;
            }
        });
        let newOrder = true;
        if (order[0].archived === true) newOrder = false; 
        const reviewUpdated = await Order.update({archived: newOrder}, {where: {id: {[Sequelize.Op.in]: ids}}});
        const orders = await Order.findAll({
                                            where: {archived: false},
                                            order: [['id', 'ASC']],
                                            include: [{
                                                model: User
                                            }]
                                            });
        res.status(200).json({msg: `${order.length} order/s changed archived property to ${newOrder}`, result: orders})
    } catch (error) {
        res.status(400).json({err: error})
    }
})

module.exports = router;