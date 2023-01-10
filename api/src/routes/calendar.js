const { Router } = require('express');
const router = Router();
const authWithoutAdm = require('./middleware/authWithoutAdm')
const { Sequelize } = require("sequelize");

const { Appointment } = require('./../db.js');


// router.get('/', async (req,res)=> {                                                     
    
//     try {                                        
//         const result = await Location.findAll({
//             where: {
//                 archived: false,
//                 visible: true
//             },
//             order: [['created', 'DESC']],
//         });  
//         res.status(200).json({msg: 'Locations obtained successfully.', result: result});
//         return
//     } catch (error) {
//         res.status(400).json({err: error.message});
//     }
// })

router.post('/', async (req,res) => {    
  const appointment = req.body;                                                       
  const {date, time, email} = req.body; 
  
  // si faltan datos, no continua
  if(!date || !time || !email) return res.status(400).json({err: 'Missing data.'});              
  
  try {
      // chequeo si ya hay un turno asignado a este email
      const checkAppointment = await Appointment.findAll({
        where: {
          email: email
        }})
      
      // funcion para manejar las fechas
      const addDays = (date, days) => {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
      }
      // seteo fecha de inicio y fin de busqueda en la DB
      const today = new Date();
      var startDate = today.toISOString().split('T')[0];
      var finalDate = addDays(startDate, 21);

      // si el mail tenia un turno asignado, lo actualizo con la fecha y hora
      if (checkAppointment.length !== 0) {
          await Appointment.update({date: date, time: time }, {
            where: {
                email: email
              }
            }
          );
          
          const result = await Appointment.findAll({
                                                    where: {
                                                      date: {
                                                        [Sequelize.Op.between]: [
                                                          startDate,
                                                          finalDate.toISOString().slice(0,10)
                                                        ]
                                                      } 
                                                    },
                                                  }); 
          return res.status(201).json({msg: 'Appointment updated succesfully.', result: result});
      }
      
      // si no, creo un nuevo turno
      const appointmentCreate = await Appointment.create(appointment);                                
      const result = await Appointment.findAll({
                                                where: {
                                                  date: {
                                                    [Sequelize.Op.between]: [
                                                      startDate,
                                                      finalDate.toISOString().slice(0,10)
                                                    ]
                                                  } 
                                                },
                                              }); 
      res.status(201).json({msg: 'Appointment created succesfully.', result: result});
  } catch (error) {
      res.status(404).json({err: error.message});
  }
})

router.delete('/', async (req, res) => {
  const appointment = req.body;                                                       
  const {date, time, email} = req.body; 

  if(!date || !time || !email) return res.status(400).json({err: 'Missing data.'});
  
  try {
      const { id } = req.params;
      const appointmentToDelete = await Appointment.findAll({
        where: {
          date: date,
          time: time,
          email: email
        }
    });
      if (appointmentToDelete === null) {
          return res.status(400).json({ err: `The appointment does not exits.` });
      }
      await Appointment.destroy({
          where: {
            date: date,
            time: time,
            email: email
          }
      });
      const appointments = await Appointment.findAll(
                                          //  {
                                          //     where: {archived: archived},
                                          //     order: [['created', 'DESC']],
                                          // }
                                          );
      res.json({msg: `Appointment for ${email} has been deleted.`, result: appointments})
  } catch (error) {
      res.status(400).json({ err: error })
  }
})

module.exports = router;