import React from 'react';

import styles from './Button.module.css';

const Button = ({ text, onClick, disabled, value, selected, title }) => {

  return (
    <>
      <button
        className={ styles.button }
        onClick={ onClick }
        disabled={ disabled }
        value={ value }
        selected={ selected }
        title={ title }
      >
        { text }
      </button>
    </>
  );
};

export default Button;