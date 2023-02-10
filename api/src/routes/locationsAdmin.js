const { Router } = require('express');
const router = Router();
const authWithoutAdm = require('./middleware/authWithoutAdm')
const { Sequelize } = require("sequelize");

const { Location, Appointment } = require('./../db.js');


router.get('/', async (req,res)=> {                                                     
    const { archived } = req.query;
    
    try {                                        
        const result = await Location.findAll({
            where: {archived: archived},
            order: [['created', 'DESC']],
        });  
        res.status(200).json({msg: 'Locations obtained successfully.', result: result});
        return
    } catch (error) {
        res.status(400).json({err: error.message});
    }
})

//se pasa middleware para proteger rutas de review para creacion, modificacion o eliminacion
router.use(authWithoutAdm);

router.get('/:id', async (req,res)=> {                                                     
    const { id } = req.params;

    try {                                        
        
        // fecha de inicio
        const today = new Date();
        var startDate = today.toISOString().split('T')[0];
    
        // obtengo los horarios reservados de la DB
        const reserved = await Appointment.findAll({
            where: {
                date: {
                [Sequelize.Op.gte]: startDate
                },
                location: id
                },
            order: [
                ['date', 'ASC'],
                ['time', 'ASC']
            ]
            });
        
        res.status(200).json({msg: 'Appointments obtained successfully.', result: reserved});
        return
    } catch (error) {
        res.status(400).json({err: error.message});
    }
})

router.post('/', async (req,res) => {    
    const location = req.body;                                                       
    const {name, address} = req.body; 
    
    if(!name || !address) return res.status(400).json({err: 'Missing data.'});              
    
    try {

        const locationCreate = await Location.create(location);                                
        const result = await Location.findAll({
                                                where: {archived: false},
                                                order: [['created', 'DESC']],
                                                }); 
        res.status(201).json({msg: 'Location created succesfully.', result: result});
    } catch (error) {
        res.status(404).json({err: error.message});
    }
})

router.put('/', async (req,res) => {
    const { archived } = req.query; 
     
    const {id, name, address, contact, lat, lon} = req.body;

    if(!id || !name || !address) return res.status(400).json({err: 'Missing data.'}); 
    if(isNaN(lat) || isNaN(lon)) return res.status(400).json({err: 'Invalid lat or lon data.'})
    try { 
        const location = await Location.findByPk(id);
        if(!location){
            res.status(404).json({err: `Location with id: ${id} doesn't exist.`});
            return;
        }
        const udpatedLocation = await Location.update({
                                                        name: name,
                                                        address: address,
                                                        contact: contact,
                                                        lat: lat,
                                                        lon: lon
                                                    },
                                                    {where: {id: id}});
        const result = await Location.findAll({
                                                where: {archived: archived},
                                                order: [['created', 'DESC']],
                                                }); 
        res.status(200).json({msg: `Location with id: ${id} has been updated`, result: result})
    } catch (error) {
        res.status(400).json({err: error})
    }
})

router.put('/ap/', async (req,res) => {
    const { archived } = req.query; 
     
    const {id, aPspecialDates, aPnormalDates} = req.body;

    if(!id || !aPnormalDates) return res.status(400).json({err: 'Missing data.'}); 
    try { 
        const location = await Location.findByPk(id);
        if(!location){
            res.status(404).json({err: `Location with id: ${id} doesn't exist.`});
            return;
        }
        const udpatedLocation = await Location.update({
                                                    aPspecialDates: aPspecialDates,
                                                    aPnormalDates: aPnormalDates,   
                                                    },
                                                    {where: {id: id}});
        const result = await Location.findAll({
                                                where: {archived: archived},
                                                order: [['created', 'DESC']],
                                                }); 
        res.status(200).json({msg: `Location with id: ${id} has been updated`, result: result})
    } catch (error) {
        res.status(400).json({err: error})
    }
})

router.put('/archive/', async (req,res) => {
    const {ids} = req.body;     
    const { archived } = req.query; 

    try { 
        const location = await Location.findAll({where: {id: {[Sequelize.Op.in]: ids}}});
        location.forEach(element => {
            if(!ids.includes(element.dataValues.id)){
                res.status(404).json({err: `Location with id: ${element.dataValues.id} doesn't exist. Cancelling operation.`});
                return;
            }
        });
        let newLocation = true;
        if (location[0].archived === true) newLocation = false; 
        const campaignUpdated = await Location.update({archived: newLocation}, {where: {id: {[Sequelize.Op.in]: ids}}});
        const locations = await Location.findAll({
                                                where: {archived: archived},
                                                order: [['created', 'DESC']],
                                                });
        res.status(200).json({msg: `${location.length} location/s changed archived property to ${newLocation}`, result: locations})
    } catch (error) {
        res.status(400).json({err: error})
    }
})

router.put('/visible/', async (req,res) => {
    const { ids } = req.body;     
    const { archived } = req.query; 

    try { 
        const location = await Location.findAll({where: {id: {[Sequelize.Op.in]: ids}}});
        location.forEach(element => {
            if(!ids.includes(element.dataValues.id)){
                res.status(404).json({err: `Location with id: ${element.dataValues.id} doesn't exist. Cancelling operation.`});
                return;
            }
        });
        let newLocation = true;
        if (location[0].visible === true) newLocation = false; 
        const campaignUpdated = await Location.update({visible: newLocation}, {where: {id: {[Sequelize.Op.in]: ids}}});
        const locations = await Location.findAll({
                                                where: {archived: archived},
                                                order: [['created', 'DESC']],
                                                });
        res.status(200).json({msg: `${location.length} location/s changed archived property to ${newLocation}`, result: locations})
    } catch (error) {
        res.status(400).json({err: error})
    }
})

router.put('/rating/', async (req,res) => {
    const {id, value} = req.body;     
    const { archived } = req.query; 
    
    try { 
        const location = await Location.findByPk(id);
        if(!location){
            res.status(404).json({err: `Location with id: ${id} doesn't exist.`});
            return;
        }
        
        const locationUpdated = await Location.update({rating: value}, {where: {id: id}});
        const locations = await Location.findAll({
                                                where: {archived: archived},
                                                order: [['created', 'DESC']],
                                                });
        res.status(200).json({msg: `Location ${location.title} changed rating value to ${value}`, result: locations})
    } catch (error) {
        res.status(400).json({err: error})
    }
})

router.delete('/ap/', async (req, res) => {
    //const appointment = req.body;
    const { id, location } = req.body;
    
    if (!id)
      return res.status(400).json({ err: 'Missing data.' });
  
    try {
      const appointmentToDelete = await Appointment.findByPk(id);
      
      if (appointmentToDelete === null) {
        return res.status(400).json({ err: `The appointment does not exits.` });
      }
  
      await Appointment.destroy({
                                  where: {
                                      id: id
                                  }
                              });

        // fecha de inicio
        const today = new Date();
        var startDate = today.toISOString().split('T')[0];
    
        // obtengo los horarios reservados de la DB
        const reserved = await Appointment.findAll({
            where: {
                date: {
                [Sequelize.Op.gte]: startDate
                },
                location: location
                },
            order: [
                ['date', 'ASC'],
                ['time', 'ASC']
            ]
            });
      res.json({ msg: `Appointment ${id} has been deleted.`, result: reserved});
    } catch (error) {
      res.status(400).json({ err: error });
    }
  });
  
router.delete('/:id', async (req, res) => {
    const { archived } = req.query;

    try {
        const { id } = req.params;
        const locationToDelete = await Location.findByPk(id);
        if (locationToDelete === null) {
            return res.status(400).json({ err: `The location with id: ${id} does not exits.` });
        }
        await Location.destroy({
            where: {
                id: id
            }
        });
        const locations = await Location.findAll({
                                                where: {archived: archived},
                                                order: [['created', 'DESC']],
                                            });
        res.json({msg: `Location ${locationToDelete.name} has been deleted.`, result: locations})
    } catch (error) {
        res.status(400).json({ err: error })
    }
})



module.exports = router;