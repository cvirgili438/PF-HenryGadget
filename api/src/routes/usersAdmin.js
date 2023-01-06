const admin = require('./config/firebase-config')
const { Router } = require('express');
const router = Router();
const authWithoutAdm = require('./middleware/authWithoutAdm')

const { User, Review } = require('../db.js');
const { Sequelize } = require("sequelize");

router.get('/', async (req,res) => {

    try { 
        console.log(true)
        const users = await User.findAll({order: [['uid', 'ASC']]});
        res.status(200).json({msg: `${users.length} users loaded`, result: users})
    } catch (error) {
        res.status(400).json({err: error})
    }
  })

//se pasa middleware para proteger rutas de users para suspender o cambiar modo
router.use(authWithoutAdm);

router.post('/log/', async (req, res) => {
  const {uid, displayName, email, photoURL} = req.body;
    console.log(uid, displayName, email, photoURL);
  try {
      const user = await User.findByPk(uid);
      if(!user){
          // crea el registro
          res.status(404).json({err: `User with uid: ${uid} doesn't exist.`});
          return;
      }
      //actualiza el registro
      const userUpdated = await User.update({
                                            displayName: displayName,
                                            email: email,
                                            photoURL: photoURL
                                            }, {where: {uid: uid}});
      const users = await User.findAll({order: [['uid', 'ASC']]});
      res.status(200).json({msg: `${user.length} user/s changed active property to ${newUser}`, result: users})
  } catch (error) {
      res.status(400).json({err: error.message})
  }
})

router.put('/active/', async (req,res) => {
    const {ids} = req.body;     
    
    try { 
        const user = await User.findAll({where: {uid: {[Sequelize.Op.in]: ids}}});
        
        user.forEach(element => {
            if(!ids.includes(element.dataValues.uid)){
                res.status(404).json({err: `User with id: ${element.dataValues.uid} doesn't exist. Cancelling operation.`});
                return;
            }
        });
        let newUser = false;
        if (user[0].active === false) newUser = true; 
        const userUpdated = await User.update({active: newUser}, {where: {uid: {[Sequelize.Op.in]: ids}}});
        const users = await User.findAll({order: [['uid', 'ASC']]});
        res.status(200).json({msg: `${user.length} user/s changed active property to ${newUser}`, result: users})
    } catch (error) {
        res.status(400).json({err: error})
    }
})

router.put('/resetpwd/:uid', async (req,res) => {
    const {uid} = req.params;
    
    try { 
        const user = await User.findByPk(uid);
        if(!user){
            res.status(404).json({err: `User with uid: ${uid} doesn't exist.`});
            return;
        }
        
        const userUpdated = await user.update({forceNewPassword: true}, {where: {uid: uid}});
        const users = await User.findAll({order: [['uid', 'ASC']]});
        res.status(200).json({msg: `User with uid: ${uid} was marked for password change`, result: users})
    } catch (error) {
        res.status(400).json({err: error})
    }
  })

router.put('/:idUser', async (req,res) => {
    const {idUser} = req.params;
    
    try { 
        const user = await User.findByPk(idUser);
        if(!user){
            res.status(404).json({err: `User with uid: ${idUser} doesn't exist.`});
            return;
        }
        let newUser = 'admin';
        if (user.rol === 'admin') newUser = 'client'; 
        const userUpdated = await user.update({rol: newUser}, {where: {uid: idUser}});
        const users = await User.findAll({order: [['uid', 'ASC']]});
        res.status(200).json({msg: `User with id: ${idUser} has changed to ${newUser}`, result: users})
    } catch (error) {
        res.status(400).json({err: error})
    }
  })

module.exports = router;