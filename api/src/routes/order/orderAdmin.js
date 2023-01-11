const { Router } = require('express');
const router = Router();
const authWithoutAdm = require('./../middleware/authWithoutAdm')
const decodeToken = require('../middleware/index.js');
const { Sequelize } = require("sequelize");

const { Product, Review, User, Order } = require('../../db.js');


router.get('/', async (req,res)=> { 
    const { archived } = req.query;
    try {                                          
        const result = await Order.findAll({
                                            where: {archived: archived},
                                            order: [['id', 'ASC']],
                                            include: [{
                                                model: User,
                                            }]
                                            });
                                            
        res.status(200).json({msg: `${result.length} product/s loaded`, result: result});
    } catch (error) {
        res.status(400).json({err: error.message});
    }
})

//se pasa middleware para proteger rutas de review para creacion, modificacion o eliminacion
router.use(authWithoutAdm);

router.put('/status/:idOrder', async (req,res) => {
    const {idOrder} = req.params;
    const { archived } = req.query;

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
                                            where: {archived: archived},
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
    const { archived } = req.query;

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
        const orderUpdated = await Order.update({archived: newOrder}, {where: {id: {[Sequelize.Op.in]: ids}}});
        const orders = await Order.findAll({
                                            where: {archived: archived},
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

router.put('/ordership/:id', async (req,res) => {
    const { id } = req.params;     
    const { archived } = req.query;
    
    try { 
        const orderToUpdate = await Order.findByPk(id);
        if (orderToUpdate === null) {
            return res.status(400).json({ err: `The order with id: ${id} does not exits.` });
        }
        let newOrder = orderToUpdate.sentMailToCustomer + 1;
        const orderUpdated = await Order.update({sentMailToCustomer: newOrder}, {where: {id: id}});
        const orders = await Order.findAll({
                                            where: {archived: archived},
                                            order: [['id', 'ASC']],
                                            include: [{
                                                model: User
                                            }]
                                            });
        res.status(200).json({msg: `Order ${id} changed email count sent to ${newOrder}`, result: orders})
    } catch (error) {
        res.status(400).json({err: error})
    }
})

router.put('/trackingnumber/:idOrder', decodeToken, async (req, res) => { // localhost:3001/orders/trackingnumber/:idOrder (put)
    const { idOrder } = req.params;
    const { archived } = req.query;
    const { trackingNumber } = req.body;

    if (!trackingNumber) return res.status(400).json({ err: "An error in trackingNumber." });

    try {
        const orderExist = await Order.findByPk(idOrder);
        if (!orderExist) return res.status(404).json({ err: `An error in the order with id: ${idOrder} doesn't exist.` });

        await Order.update({ trackingNumber }, { where: { id: idOrder } });

        const orders = await Order.findAll({
            where: { archived: archived },
            order: [['id', 'ASC']],
            include: [{
                model: User,
            }]
        });
        res.status(200).json({ msg: 'The order was updated succesfuly.', result: orders });
    } catch (error) {
        res.status(400).json({ err: 'An error ocurred in database', err: error });
    }
});

router.delete('/:id', async (req, res) => {
    const { archived } = req.query;

    try {
        const { id } = req.params;
        const orderToDelete = await Order.findByPk(id);
        if (orderToDelete === null) {
            return res.status(400).json({ err: `The order with id: ${id} does not exits.` });
        }
        await Order.destroy({
            where: {
                id: id
            }
        });
        const orders = await Order.findAll({
                                            where: {archived: archived},
                                            order: [['id', 'ASC']],
                                            include: [{
                                                model: User
                                            }]
                                        });
        res.json({msg: `Product ${orderToDelete.name} has been deleted.`, result: orders})
    } catch (error) {
        res.status(400).json({ err: error })
    }
})


module.exports = router;