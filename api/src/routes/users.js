const admin = require('./config/firebase-config')
const { Router } = require('express');
const router = Router();
const authWithoutAdm = require('./middleware/authWithoutAdm')

const decodeToken = require('./middleware/index');
const decodeTokenNotAdmin = require('./middleware/authWithoutAdm')

const { User, Review } = require('../db.js');
const { Sequelize } = require("sequelize");


router.get('/', async (req, res) => {
    try {
        const { rol, limit, offset } = req.query;
        const condition = {};
        let where = {};

        if (rol) {
            where.rol = {[Sequelize.Op.iLike]: `%${rol}%`}
        }
        condition.where = where;
        condition.include = Review;
        condition.order = [['uid', 'ASC']];

        if (limit && offset) {
            condition.limit =  limit;
            condition.offset =  offset;
        }

        const users = await User.findAll(condition);
        res.status(200).json({msg: 'User obtained successfully.', result: users});

    } catch (error) {
        res.status(400).json({err: error.message})
    }
})

router.post('/checkstatus/', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({where: {email}});
        if (user === null) {
            return res.status(200).json({msg: 'User does not exist.', result: false});
        }
        res.status(200).json({msg: 'User exists, retrieving status.', result: {forceNewPassword: user.forceNewPassword, active: user.active}});
    } catch (error) {
        res.status(400).json({err: error.message})
    }
})

router.get('/:uid', async (req, res) => {
    try {
        const {uid} = req.params;
        const user = await User.findOne({where: {uid}});
        if (user === null) {
            return res.status(400).json({err: `The enter uid does not exist`})
        }
        res.status(200).json({msg: 'User successfully obtained.', result: user});
    } catch (error) {
        res.status(400).json({err: error.message})
    }
})


//ruta para el login o registro valida si ya existe el usuario y sino lo crea como cliente
router.post('/log', decodeTokenNotAdmin, async (req, res) => {
    
    try {
        let uid = req.user.uid;
        let newUser = await User.findOrCreate({where: {uid}});
        res.status(201).json({msg: 'User created correctly.', result: newUser})
    } catch (error) {
        res.status(400).json({err: error.message})
    }
})

//debe recibir el token en el headers, no es necesario ser admin
router.delete('/:uid', decodeTokenNotAdmin,  async (req, res) => {
    try {
        let uidFire = req.user.uid;
        const { uid } = req.params;
        if (uid !== uidFire) {
            return res.status(400).json({err: 'The uid from the params and firebase does not match'})
        }
        const userToDelete = await User.findOne({where: {uid}});

        if (userToDelete === null) {
            return res.status(400).json({err: `The user with id: ${id} does not exits.`})
        }
        await User.destroy({
            where: {uid}
        });
        res.json({msg: `The user has been deleted.`, result: userToDelete})
    } catch (error) {
        res.status(400).json({err: error.message})
    }
})


//se pasa middleware para proteger rutas de users para suspender o cambiar modo
//router.use(authWithoutAdm);

// router.put('/active/', async (req,res) => {
//     const {ids} = req.body;     
    
//     try { 
//         const user = await User.findAll({where: {uid: {[Sequelize.Op.in]: ids}}});
        
//         user.forEach(element => {
//             if(!ids.includes(element.dataValues.uid)){
//                 res.status(404).json({err: `User with id: ${element.dataValues.uid} doesn't exist. Cancelling operation.`});
//                 return;
//             }
//         });
//         let newUser = false;
//         if (user[0].active === false) newUser = true; 
//         const userUpdated = await User.update({active: newUser}, {where: {uid: {[Sequelize.Op.in]: ids}}});
//         const users = await User.findAll({order: [['uid', 'ASC']]});
//         res.status(200).json({msg: `${user.length} user/s changed active property to ${newUser}`, result: users})
//     } catch (error) {
//         res.status(400).json({err: error})
//     }
// })

// router.put('/admin/:idUser', async (req,res) => {
//     const {idUser} = req.params;
    
//     try { 
//         const user = await User.findByPk(idUser);
//         if(!user){
//             res.status(404).json({err: `User with uid: ${idUser} doesn't exist.`});
//             return;
//         }
//         let newUser = 'admin';
//         if (user.rol === 'admin') newUser = 'client'; 
//         const userUpdated = await user.update({rol: newUser}, {where: {uid: idUser}});
//         const users = await User.findAll({order: [['uid', 'ASC']]});
//         res.status(200).json({msg: `User with id: ${idUser} has changed to ${newUser}`, result: users})
//     } catch (error) {
//         res.status(400).json({err: error})
//     }
//   })

module.exports = router;