import React from 'react'
import styles from './ButtonBorderEffect.module.css'

function ButtonBorderEffect({ text, onClick, disabled, value, selected }) {
  return (
      <button
        className={ styles.button }
      >
        <span className={styles.span}></span>
        {text}
      </button>
  )
}

export default ButtonBorderEffect