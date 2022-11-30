import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Product.module.css';

const Product = ({ image, name, description, price, units_left }) => {
  // DEVELOPMENT
  image = 'https://s1.eestatic.com/2019/11/14/elandroidelibre/el_androide_libre_444469413_180850360_800x600.jpg';
  name = 'Motorola V3 RAZR';
  description = 'Celular con reproductor de MP3, camara de medio megapixel, infrarojo, y muchas mas cosas que no pienso pensar porque necesito un texto largo';
  price = 30000;
  units_left = 10;
  // DEVELOPMENT

  return (
    <div className={ styles.container }>
      <Link to='/test'>
        <img
          src={ image }
          alt={`Image from product ${ name }`}
          className={ styles.image }
          />
      </Link>
      <div className={ styles.detail }>
        <div className={ styles.name }>{ name }</div>
        <div className={ styles.description }>{ description }</div>
        <div className={ styles.price }>$ { price.toLocaleString() }</div>
        <div className={ units_left > 5 ? `${styles.units_left}` : `${styles.units_left} ${styles.low_units_left}` }>
          { units_left === 0 ? `NO` : units_left } unit{ units_left > 1 || units_left === 0 ? `s` : null } left</div>
      </div>
    </div>
  );
};

export default Product;