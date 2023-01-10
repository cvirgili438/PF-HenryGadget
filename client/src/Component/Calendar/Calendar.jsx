import React, { useState } from "react";
import DatePicker from "react-datepicker";

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';


import styles from './Calendar.module.css';

import "react-datepicker/dist/react-datepicker.css";

const Calendar = () => {
  const today = new Date();
  
  const [startDate, setStartDate] = useState(
    today.setHours(today.setMinutes(new Date(), 0), 9)
  );// fecha y hora elegida
  
  // prueba para una sucursal, al traer del back puede ser un array de esto
  const test = {10: ['10:20', '10:30', '10:40'], 11: [], 12: [], 13: ['12:40', '12:50', '13:00', '13:10']}
  /*
  - el objeto se guarda en cada sucursal
  - al hacer click en cada hora del calendario se envia consulta al back para setear esa hora
  - si se clickea sobre una hora seteada la consulta es para desmarcar esa hora
  - el objeto se modifica con la edicion del admin y con los usuarios registrados
  - tiene que haber otra tabla de turnos, donde se guarde la fecha y hora y el mail de quien reservo el turno
  - en base a la combinacion de los datos de estas dos tablas sale el objeto al front como result y booked (con el horario del usuario si reservo algo)
  - si el admin elimina horarios reservados, se tienen que borrar de la bd en la tabla turnos
  */
  

  const dates = [];
  const times = [];
  
  for (let i = 0; i < 21; i++) {
    var date = new Date();
    date.setDate(date.getDate() + i);
    dates.push(date);
  }
  console.log(startDate)

  // function setTime(date, hours, minutes) {
  //   date.setHours(hours);
  //   date.setMinutes(minutes);
  //   return date;
  // }
  // let time = [setTime(new Date(), 12, 30)]
  // console.log(time);

  const handleChange = (e) => {
    console.log(e.target.innerText)
  }

  return (
    <div className={ styles.container }>
      <DatePicker
        inline
        selected={ startDate }
        onChange={ (date) => setStartDate(date) }
        onChangeRaw={ handleChange }
        // showTimeSelect
        includeDates={ dates }
        // includeTimes={ time }
        dateFormat="MMMM d, yyyy h:mm aa"
      />
        {/* <div style={{ color: "red" }}>
          Selected: {
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
          </div> */}
      {/* </DatePicker> */}

      <Box sx={{ width: '100%', maxWidth: 70, bgcolor: 'background.paper' }}>
        <List dense>
        {
          ['12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45']
          .map((p, i) => (
            <ListItem disablePadding>
              <ListItemButton selected={ i === 3 ? true : false } >
                <ListItemText primary={p} />
              </ListItemButton>
            </ListItem>
          )
          ) 
        }
        </List>
    </Box>
    </div>
  );
}

export default Calendar;