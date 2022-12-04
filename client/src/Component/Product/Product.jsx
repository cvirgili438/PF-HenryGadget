import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Product.module.css';

const Product = ({ name, description, image, price, units_left, id }) => { //agregue id para pasar al detail
  const trim_text = 120;  // cantidad de caracteres a mostrar, el resto se cortan y se agregan tres puntitos

  return (
    <div className={ styles.container }>
      
      <Link to={`/product/${ id }`}> 
        <img
          src={ image }
          alt={ name }
          className={ styles.image }
          />
      </Link>
      <div className={ styles.detail }>
        <div className={ styles.name }>{ name }</div>
        <div className={ styles.description }>{ description ? description.length > trim_text ? `${description.trim().slice(0, trim_text)}...` : description : null }</div>
        <div className={ styles.price }>$ { price.toLocaleString() }</div>
        <div className={ units_left > 5 ? `${styles.units_left}` : `${styles.units_left} ${styles.low_units_left}` }>
          { units_left === 0 ? `NO` : units_left } unit{ units_left > 1 || units_left === 0 ? `s` : null } left</div>
      </div>
    </div>
  );
};

export default Product;