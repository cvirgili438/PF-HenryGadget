const { Router } = require('express');
const router = Router();
const authWithoutAdm = require('./middleware/authWithoutAdm');
const { Sequelize } = require('sequelize');

const { Appointment } = require('./../db.js');

router.get('/:location', async (req, res) => {
  const { location } = req.params;
  const { email } = req.query;

  try {
    // si faltan datos, no continua
    if (!location) return res.status(400).json({ err: 'Missing data.' });
    
    //funcion para sumar dias a una fecha
    const addDays = (date, days) => {
      let result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    };

    // seteo fecha de inicio y fin de trunos disponibles
    // inincio: hoy ... fin: dentro de 21 dias
    const today = new Date();
    var startDate = today.toISOString().split('T')[0];
    var finalDate = addDays(startDate, 21);

    // horarios de apertura, ver mas abajo el otro comentario sobre una funcion que estaria faltando
    // si agregamos esa funcion, estos horarios tendiran que ir desde 00:00 hasta 23:45
    const defaultTimes = [
      '09:00', '09:15', '09:30', '09:45',
      '10:00', '10:15', '10:30', '10:45',
      '11:00', '11:15', '11:30', '11:45',
      '12:00', '12:15', '12:30', '12:45',
      '13:00', '13:15', '13:30', '13:45',
      '14:00', '14:15', '14:30', '14:45',
      '15:00', '15:15', '15:30', '15:45',
      '16:00', '16:15', '16:30', '16:45',
      '17:00', '17:15', '17:30', '17:45',
    ];
    // objeto base
    let upcoming = {};

    // agrego al objeto base todos los dias y horarios libres
    for (let i = 1; i <= 21; i++) {
      if(addDays(startDate, i).getDay() !== 6 && addDays(startDate, i).getDay() !== 5) {
        upcoming[addDays(startDate, i).toISOString().split('T')[0]] = defaultTimes;
      }
    }

    // obtengo los horarios reservados de la DB
    const reserved = await Appointment.findAll({
                                              where: {
                                                [Sequelize.Op.and]: [
                                                  {date: {
                                                    [Sequelize.Op.between]: [
                                                      startDate,
                                                      finalDate.toISOString().slice(0,10)
                                                    ]
                                                  }},
                                                  {
                                                    email: {
                                                      [Sequelize.Op.not]: email
                                                    }
                                                  }
                                                ]
                                                ,
                                                location: location
                                              },
                                            });
    
    // quito al objeto base los horarios reservados
    for (const property in upcoming) {
      for (let i = 0; i < reserved.length; i++) {
        if (property === reserved[i].dataValues.date) {
          // saco del array de horarios el que esta en reserved[i].dataValues.time
          upcoming[property] = upcoming[property].filter(e => e !== reserved[i].dataValues.time.slice(0, 5));
        }
      }
    }
    
    // *************************************
    // aca tendria que haber otra funcion que quite los dias y horarios no disponibles para esa sucursal
    // por ejemplo, feriados de ese pais, dias que no se trabaja, horarios que esta cerrado, etc.
    // todo eso deberia estar guardado en cada sucursal, por ej en un json o algo asi
    // y la logica de como se guarda armada en el front-admin en el crud de sucursales, posiblemente
    // en el modal donde se edita la informacion de la sucursal
    // *************************************

    let user;
    if (email) {
      user = await Appointment.findOne({ where: { email: email, location: location } });
      if (!user) user = {id: null}
    }
    res.status(200).json({ msg: 'Locations obtained successfully.', result: upcoming, user: user });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
});

router.post('/', async (req, res) => {
  const appointment = req.body;
  const { location, date, time, email } = req.body;

  // si faltan datos, no continua
  if (!location || !date || !time || !email) return res.status(400).json({ err: 'Missing data.' });

  try {
    // chequeo si ya hay un turno asignado a este email
    const checkAppointment = await Appointment.findOne({
      where: { email: email },
    });

    // si el mail tenia un turno asignado lo actualizo con la fecha y hora
    if (checkAppointment) {
      await Appointment.update(
        { location: location, date: date, time: time },
        { where: { email: email } }
        );
      const result = await Appointment.findOne({ where: { email: email } });
      return res.status(200).json({ msg: 'Appointment updated succesfully.', result: result });
    }
    
    // sino lo creo
    await Appointment.create(appointment);
    
    const result = await Appointment.findOne({ where: { email: email } });
    res.status(200).json({ msg: `Appointment created succesfully.`, result: result });
  } catch (error) {
    res.status(404).json({ err: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  //const appointment = req.body;
  const { id } = req.params;

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
    res.json({ msg: `Appointment ${id} has been deleted.`, result: {id: 'deleted'}});
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

module.exports = router;
