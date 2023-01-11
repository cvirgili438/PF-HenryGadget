import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import DatePicker from "react-datepicker";

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

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
  const [highlightedDate, setHighlightedDate] = useState(null);
  const [highlightedTime, setHighlightedTime] = useState(null);

  const dispatch = useDispatch();

  const user = useSelector(state => state.user);
  const appointments = useSelector(state => state.appointments);
  const currentAppointment = useSelector(state => state.currentAppointment);

  if (currentAppointment.id !== null && currentAppointment.id !== 'deleted') {
    if (highlightedDate === null) setHighlightedDate(new Date(currentAppointment.date + ' 00:00:00'))
    if (highlightedTime === null && (highlightedDate === (new Date(currentAppointment.date + ' 00:00:00'))) ) setHighlightedTime(currentAppointment.time.slice(0, 5))
  } else {
    if (highlightedDate !== null) setHighlightedDate(null)
    if (highlightedTime !== null) setHighlightedTime(null)
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
    
    if (currentAppointment.id !== null && currentAppointment.id !== 'deleted') {
      const formatYmd = date => date.toISOString().slice(0, 10);
      if (highlightedDate !== null) {
        if (formatYmd(highlightedDate) === key[0]) {
          setHighlightedTime(currentAppointment.time.slice(0, 5))
        } else {
          setHighlightedTime(null)
        }
      } else {
        setHighlightedDate(new Date(currentAppointment.date + ' 00:00:00'))
      }
    } else {
      setHighlightedTime(null)
      setHighlightedDate(null)
    }
  }

  const handleTimeClick = (e) => {
    if (user) {
      dispatch(createOrUpdateAppointment({location: uid, email: user.email, date: selectedDate, time: e.target.innerText}))
      setHighlightedDate(new Date(selectedDate + ' 00:00:00'))
      setSelectedTime(e.target.innerText)
      setHighlightedTime(e.target.innerText)
    }
  }

  const handleDelete = (e) => {
    dispatch(deleteAppointment(currentAppointment.id))
  }

  useEffect(() => {
    if (uid) {
      dispatch(getAppointments({location: uid, email: user ? user.email : null}))
    }
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
          highlightDates={ highlightedDate === null ? [] : [highlightedDate]  }
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
        Object.keys(currentAppointment).length > 0 && uid ?
          !user && selectedTime ?
            <div className={ styles.deleted }>You should login<br />to make and appointment</div>
            :
            currentAppointment.id === 'deleted' ?
              <div className={ styles.deleted }>Appointment deleted</div>
              :
              currentAppointment.id === null ?
                <div className={ styles.normal }>Select date and time<br />to appoint</div>
                :
                <>
                <div className={ styles.confirmed }>Appointment confirmed:<br />{ currentAppointment.date } at { currentAppointment.time.slice(0, 5)} hs.</div>
                <Button variant="outlined" onClick={ handleDelete } color="error" >Delete appointment</Button>
                </>
          :
          null
      }
    </>
  );
}

export default Calendar;