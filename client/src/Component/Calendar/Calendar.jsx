import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import DatePicker from "react-datepicker";

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


import {
  getAppointments,
  createOrUpdateAppointment
} from '../../Redux/Actions/calendar.js'

import styles from './Calendar.module.css';

import "react-datepicker/dist/react-datepicker.css";

const Calendar = ({uid}) => {
  
  // horarios por defecto para que no rompa por array vacio
  const [times, setTimes] = useState([
    '09:00', '09:15', '09:30', '09:45',
    '10:00', '10:15', '10:30', '10:45',
    '11:00', '11:15', '11:30', '11:45',
    '12:00', '12:15', '12:30', '12:45',
    '13:00', '13:15', '13:30', '13:45',
    '14:00', '14:15', '14:30', '14:45',
    '15:00', '15:15', '15:30', '15:45',
    '16:00', '16:15', '16:30', '16:45',
    '17:00', '17:15', '17:30', '17:45',
    '18:00', '18:15', '18:30', '18:45',
    '19:00', '19:15', '19:30', '19:45',
  ]);

  const [startDate, setStartDate] = useState(); // fecha elegida en formato calendario
  const [selectedDate, setSelectedDate] = useState(); // fecha elegida en formato YYYY-MM-DD
  const [selectedTime, setSelectedTime] = useState(); // hora elegida

  const dispatch = useDispatch();
  
  /*
  - el objeto se guarda en cada sucursal
  - al hacer click en cada hora del calendario se envia consulta al back para setear esa hora
  - si se clickea sobre una hora seteada la consulta es para desmarcar esa hora
  - el objeto se modifica con la edicion del admin y con los usuarios registrados
  - tiene que haber otra tabla de turnos, donde se guarde la fecha y hora y el mail de quien reservo el turno
  - en base a la combinacion de los datos de estas dos tablas sale el objeto al front como result y booked (con el horario del usuario si reservo algo)
  - si el admin elimina horarios reservados, se tienen que borrar de la bd en la tabla turnos
  */

  const user = useSelector(state => state.user);
  const appointments = useSelector(state => state.appointments);

  const addDays = (date, days) => {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
 
  let nonEmptyArrays = Object
    .entries(appointments)
    .filter(([key, value]) => Array.isArray(value) && value.length > 0)
    .map(([key, value]) => new Date(key))
    .map(e => addDays(e, 1))

  const handleChange = (e) => {
    let dia = e.target.innerText
    let key = Object.keys(appointments).filter(e => e.slice(8,10) === dia)
    setTimes(appointments[key])
    setSelectedDate(key[0])
  }

  const handleTimeClick = (e) => {
    if (user) {
      setSelectedTime(e.target.innerText)
      dispatch(createOrUpdateAppointment({location: uid, email: 'stabilini@hotmail.com', date: selectedDate, time: selectedTime || e.target.innerText}))
      .then(dispatch(getAppointments({location: uid, user: user ? user.email : null})))
    }
  }

  useEffect(() => {
    dispatch(getAppointments({location: uid, user: user ? user.email : null}))
  }, [dispatch, user, uid]);

  return (
    <div className={ styles.container }>
      <DatePicker
        inline
        selected={ startDate }
        onChange={ (date) => setStartDate(date) }
        onChangeRaw={ handleChange }
        // showTimeSelect
        includeDates={ nonEmptyArrays }
        // includeTimes={ time }
        dateFormat="MMMM d, yyyy h:mm aa"
      />
        {
          // logica que muestre si se confirmo el turno o si se anulo
        /* <div style={{ color: "red" }}>
          Appointment confirmed for {
                      startDate ? 
                        startDate.toLocaleString('en-GB', {
                                                          day: '2-digit',
                                                          month: '2-digit',
                                                          year: 'numeric',
                                                          hour: '2-digit',
                                                          minute: '2-digit'
                                                          })
                          :
                          'none'
                    }
          </div> */
          }
      {/* </DatePicker> */}

      <Box sx={{
              width: '100%', maxWidth: 80, bgcolor: 'background.paper',
              height: 240, overflow: 'hidden', overflowY: 'scroll',
              borderTop: 1, borderRight: 1, borderBottom: 1, borderColor: 'grey.500' }}>
        <List dense>
        {
          startDate ?
            times
            .map((p, i) => (
              <ListItem disablePadding>
                <ListItemButton >
                  <ListItemText primary={ p } onClick={ handleTimeClick } />
                </ListItemButton>
              </ListItem>
            )
            )
          :
          null
        }
        </List>
    </Box>
    </div>
  );
}

export default Calendar;