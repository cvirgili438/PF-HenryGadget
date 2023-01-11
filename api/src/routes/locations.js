const { Router } = require('express');
const router = Router();
const authWithoutAdm = require('./middleware/authWithoutAdm')
const { Sequelize } = require("sequelize");

const { Location } = require('./../db.js');


router.get('/', async (req,res)=> {                                                     
    
    try {                                        
        const result = await Location.findAll({
            where: {
                archived: false,
                visible: true
            },
            order: [['created', 'DESC']],
        });  
        res.status(200).json({msg: 'Locations obtained successfully.', result: result});
        return
    } catch (error) {
        res.status(400).json({err: error.message});
    }
})


module.exports = router;