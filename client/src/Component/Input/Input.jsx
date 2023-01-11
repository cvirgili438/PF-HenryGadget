import React from 'react';

import styles from './Input.module.css';

const Input = ({ label, type, name, placeholder, value, onChange }) => {

  
  return (
    <>
      <label className={ styles.label }>{ label }</label>
        <input
          className={ styles.input }
          type={ type }
          name={ name }
          placeholder={ placeholder }
          value={ value }
          onChange={ onChange }/>      
    </>
  );
}

export default Input;