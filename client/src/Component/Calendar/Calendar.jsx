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
  createOrUpdateAppointment,
  deleteAppointment,
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
  const [highlightedDate, setHighlightedDate] = useState([]);
  const [highlightedTime, setHighlightedTime] = useState(null);

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
  const currentAppointment = useSelector(state => state.currentAppointment);

  const change = () => {
    // if (currentAppointment.id !== null && currentAppointment.id !== 'deleted' && highlightedDate.length > 0) {
    //   setHighlightedTime(currentAppointment.time)
    //   // setHighlightedDate([])
    // } else {
    //   setHighlightedTime('25:00')
    //   // setHighlightedDate(new Date(currentAppointment.date + ' 00:00:00'))
    // }
    if (currentAppointment.id !== null && currentAppointment.id !== 'deleted') {
      
      if (highlightedDate !== currentAppointment.date) {
        setHighlightedDate(new Date(currentAppointment.date + ' 00:00:00'))
        setHighlightedTime(null)
      } else {
        setHighlightedTime(currentAppointment.time.slice(0, 5))
      }
      // if (highlightedTime === null) {
      //   setHighlightedDate(new Date(currentAppointment.date + ' 00:00:00'))
      //   setHighlightedTime(currentAppointment.time)
      // }
    }
    //  else {
    //   if (highlightedDate.length !== 0) {
    //     setHighlightedTime(null)
    //     setHighlightedDate([])
    //   }
    //   if (highlightedTime !== null) {
    //     setHighlightedDate([])
    //     setHighlightedTime(null)
    //   }
    // }
  }

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
    .splice(0, 14)

  
  const handleChange = (e) => {
    let dia = e.target.innerText
    let key = Object.keys(appointments).filter(e => e.slice(8,10) === dia)
    setTimes(appointments[key])
    setSelectedDate(key[0])
    change()
  }

  const handleTimeClick = (e) => {
    setSelectedTime(e.target.innerText);
    if (user) {
      if (selectedTime === e.target.innerText) {
        dispatch(deleteAppointment(currentAppointment.id))
        // setSelectedTime(null);
      } else {
        dispatch(createOrUpdateAppointment({location: uid, email: user.email, date: selectedDate, time: e.target.innerText}))
      }
      change()
    }
  }

  useEffect(() => {
    if (uid) {
      dispatch(getAppointments({location: uid, email: user ? user.email : null}))
    }
    change()
  }, [dispatch, user, uid]);
  
  return (
    <>
      <div className={ styles.container }>
      {
        !uid ?
          <div className={ styles.confirmed }>Select location to<br />make an appointment</div>
        :
        <>
          <DatePicker
          inline
          selected={ startDate }
          onChange={ (date) => setStartDate(date) }
          onChangeRaw={ handleChange }
          includeDates={ nonEmptyArrays }
          highlightDates={ [highlightedDate]  }
          dateFormat="MMMM d, yyyy h:mm aa"
          />
          <Box sx={{
                  width: '100%', maxWidth: 80, bgcolor: 'background.paper',
                  height: 240, overflow: 'hidden', overflowY: 'scroll',
                  borderTop: 1, borderRight: 1, borderBottom: 1, borderColor: 'grey.500' }}>
            <List dense>
            {
              startDate ?
                times
                .map((p, i) => (
                  <ListItem disablePadding key={ i } sx={ p === highlightedTime ? { bgcolor: 'green' } : null }>
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
         
        </>
      }
      </div>
      {
        Object.keys(currentAppointment).length > 0 ?
          currentAppointment.id === null ?
            <div className={ styles.normal }>Select date and time<br />to appoint</div>
            :
            currentAppointment.id === 'deleted' ?
              <div className={ styles.deleted }>Appointment deleted</div>
              :
              <div className={ styles.confirmed }>Appointment confirmed:<br />{ currentAppointment.date } at { currentAppointment.time.slice(0, 5)} hs.</div>
          :
          null
      }
      {
        !user && selectedTime ?
          <div className={ styles.normal }>You should login<br />to make and appointment</div>
          :
          null
      }
    </>
  );
}

export default Calendar;