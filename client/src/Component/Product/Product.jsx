import React from 'react';
import { Link } from 'react-router-dom';

import noImage from '../../Assets/noImage.jpg';
import {Button , IconButton} from '@mui/material'
import styles from './Product.module.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button_contained_primary } from '../../Utils/MiuStyles/MiuStyles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Product = ({ name, description, image, price, units_left, id }) => { //agregue id para pasar al detail
  const trim_text = 120;  // cantidad de caracteres a mostrar, el resto se cortan y se agregan tres puntitos
  return (
    <div className={ styles.container }>
      
      <Link to={`/product/${ id }`}>
      {
        !image ?
          <img className={ styles.image } src={ noImage } alt='Not available' />
        :
        image.length === 0 ?
            <img className={ styles.image } src={ noImage } alt='Not available' />
          :
          <img className={styles.image} src={image[0]} alt={name} />
      }
      </Link>
      <div className={ styles.detail }>
        <div className={ styles.name }>{ name }</div>
        <div className={ styles.description }>{ description ? description.length > trim_text ? `${description.trim().slice(0, trim_text)}...` : description : null }</div>
        <div className={ styles.price }>$ { price.toLocaleString() }</div>
        <div className={ units_left > 5 ? `${styles.units_left}` : `${styles.units_left} ${styles.low_units_left}` }>
          { units_left === 0 ? `NO` : units_left } unit{ units_left > 1 || units_left === 0 ? `s` : null } left</div>
      </div>
      <div style={{display:'flex',width:'100%',justifyContent:'space-around',marginTop:'1rem',marginBottom:'1rem'}}>
        <IconButton>
          <FavoriteBorderIcon></FavoriteBorderIcon>
        </IconButton>
        <Button variant='contained' sx={Button_contained_primary}>
          <AddShoppingCartIcon style={{marginRight:'10px'}}/>
          Add cart
        </Button>
      </div>
    </div>
  );
};

export default Product;