import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import noImage from '../../Assets/noImage.jpg';
import { Button, IconButton, Box, Card, CardActionArea, CardContent, CardMedia, Paper, Typography } from '@mui/material'
import styles from './Product.module.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button_contained_primary } from '../../Utils/MiuStyles/MiuStyles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { addProductCart, getQuantityProductCart } from '../../Utils/cart/cartCrud';
import { useSelector } from 'react-redux';

const Product = ({ name, description, image, price, units_left, id }) => { //agregue id para pasar al detail
  const user = useSelector(state => state.user)
  const trim_text = 120;  // cantidad de caracteres a mostrar, el resto se cortan y se agregan tres puntitos
  const [stock, setStock] = useState(0)

  const img = {
    src: '',
    alt: ''
  }
  if (!image || image.length === 0) {
    img.src = noImage;
    img.alt = 'Not available'
  } else {
    img.src = image[0];
    img.alt = name
  }

  useEffect(async () => {
    setStock(units_left - await getQuantityProductCart(id, user && user.uid))    
  }, [stock]);  

  let HandleAddCart = async (e) => {
    await addProductCart(id, user && user.uid, 1)
    setStock(units_left - await getQuantityProductCart(id, user && user.uid))    
  }

  return (
    <Card sx={{ backgroundColor: 'rgb(244, 244, 244)', margin: 1, maxWidth: 300, minWidth: 300 }}>

      <Link to={`/product/${id}`}>
        <Box sx={{ width: '100%', height: '15rem' }}>
          <CardMedia
            sx={{ maxWidth: 140, margin: 'auto', paddingTop: '1rem' }}
            component="img"
            alt={img.alt}
            height="auto"
            image={img.src}
          />
        </Box>
      </Link>
      <CardContent sx={{ textAlign: 'left', color: '#333', borderTop: '1px solid rgba(51,51,51,.1)' }}>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        {description ? description.length > trim_text ?
          <Typography variant="body2" color="text.secondary">
            `${description.trim().slice(0, trim_text)}...`
          </Typography> : description : null
        }
        <Typography variant='h5' component="div" sx={{ fontWeight: '600' }}>
          $ {price.toLocaleString()}
        </Typography>
        {
          stock > 5 ?
            <Paper sx={{ backgroundColor: '#5fcd21c2', color: '#fff', maxWidth: '6rem', padding: '3px' }} elevation={0}>
              {stock} units left
            </Paper> :

            <Paper sx={{ backgroundColor: '#e91818b8', color: '#fff', maxWidth: '6rem', padding: '3px' }} elevation={0}>
              {stock === 0 ? `NO` : stock} unit{stock > 1 || stock === 0 ? `s` : null} left
            </Paper>
        }
      </CardContent>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', marginTop: '1rem', marginBottom: '1rem' }}>
        <IconButton>
          <FavoriteBorderIcon></FavoriteBorderIcon>
        </IconButton>
        <Button onClick={e => HandleAddCart(e)} variant='contained' sx={Button_contained_primary}>
          <AddShoppingCartIcon style={{ marginRight: '1rem' }} />
          Add cart
        </Button>
      </div>
    </Card>
  );
};

export default Product;