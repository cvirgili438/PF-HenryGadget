import React from 'react';

import styles from './Checkbox.module.css';

function Checkbox({name, text, onChange, defaultChecked}) {


  return (
    <>
      <label className={ styles.label }>
        <input
          className={ styles.checkbox }
          type="checkbox"
          onChange={onChange}
          name={name}
          defaultChecked={defaultChecked}
        />
        <span className={ styles.checkmark }></span>
        </label>
      {text} 
    </>
  );
}

export default Checkbox;