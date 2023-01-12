const { Router } = require('express');
const router = Router();
const authWithoutAdm = require('./middleware/authWithoutAdm');
const { Sequelize } = require('sequelize');

const { Appointment, Location } = require('./../db.js');

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

    // funcion que genera horarios desde 00:00 hasta 23:45
    var defaultTimes = [];
    for (var hours = 0; hours <= 23; hours++) {
      for (var minutes = 0; minutes <= 45; minutes += 15) {
          var time = ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2);
          defaultTimes.push(time);
      }
    }

    // objeto base
    let upcoming = {};

    // agrego al objeto base todos los dias y horarios libres para los proximos 21 dias
    for (let i = 1; i <= 21; i++) {
      upcoming[addDays(startDate, i).toISOString().split('T')[0]] = defaultTimes;
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
    
    // obtengo los horarios disponibles de la sucursal
    const availables = await Location.findAll({
      where: {
        id: location,
      }
    })

    // obtiene el numero de dia, le suma 1
    function getDayOfWeek(dateString) {
      var date = new Date(dateString);
      var dayOfWeek = date.getUTCDay();
      return dayOfWeek;
    }
    
    // quito al objeto base los horarios de dias de semana no disponibles de la sucursal
    for (const date in upcoming) {
      let ndate = new Date(date);
      for (let j = 0; j < availables[0].dataValues.aPnormalDates.length; j++) {
        if (availables[0].dataValues.aPnormalDates[j].hasOwnProperty(getDayOfWeek(date))) {
          if (availables[0].dataValues.aPnormalDates[j][getDayOfWeek(date)].length === 0) {
            upcoming[date] = [];
          } else {
            let inicio = availables[0].dataValues.aPnormalDates[j][getDayOfWeek(date)][0]
            let final = availables[0].dataValues.aPnormalDates[j][getDayOfWeek(date)][1]
            let temp = [...upcoming[date]]
            upcoming[date] = temp.splice(upcoming[date].indexOf(inicio), upcoming[date].indexOf(final) - upcoming[date].indexOf(inicio) + 1);
          }
        }
      }
    }

    // quito del objeto principal los dias especiales
    // *** no implementado por ahora ***

    
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
