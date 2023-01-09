import React, { useState } from "react";
import DatePicker from "react-datepicker";

import styles from './Calendar.module.css';

import "react-datepicker/dist/react-datepicker.css";

const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());

  let handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

  return (
    <div className={ styles.container }>
      <DatePicker
        inline
        selected={startDate}
      onChange={(date) => setStartDate(date)}
      showTimeSelect
      
      dateFormat="MMMM d, yyyy h:mm aa"
      />
    </div>
  );
}

export default Calendar;