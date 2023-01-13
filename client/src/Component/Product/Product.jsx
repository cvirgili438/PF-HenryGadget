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

const Product = ({ name, image, price, units_left, id }) => { //agregue id para pasar al detail
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

  useEffect(() => {
    window.scroll(0,0)
  })

  useEffect(async () => {
    
    setStock(units_left - await getQuantityProductCart(id, user && user.uid))    
  }, [stock]);  

  let HandleAddCart = async (e) => {
    await addProductCart(id, user && user.uid, 1)
    setStock(units_left - await getQuantityProductCart(id, user && user.uid))    
  }

  return (
    <Card sx={{ backgroundColor: 'rgb(244, 244, 244)', margin: 1, maxWidth: 300, minWidth: 300 , paddingTop:'1rem',height:'auto'}}>

      <Link to={`/product/${id}`}>
        <Box sx={{ width: '100%', height: '10rem' }}>
          <CardMedia
            sx={{ objectFit:'contain', margin: 'auto',width:'150px',height:'150px'}}
            component="img"
            alt={img.alt}
            height="auto"
            image={img.src}
          />
        </Box>
      </Link>
      <CardContent sx={{ textAlign: 'left', color: '#333', borderTop: '1px solid rgba(51,51,51,.1)',marginTop:'5rem',height:'13rem' }}>
        <Typography gutterBottom variant="h6" component="div">
          {name}
        </Typography>
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
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around',margin:'1rem'}}>
        {/* <IconButton>
          <FavoriteBorderIcon></FavoriteBorderIcon>
        </IconButton> */}

        <Button onClick={e => HandleAddCart(e)} disabled={stock <= 0 && true} variant='contained' sx={Button_contained_primary}>
          Add cart
        </Button>
      </div>
    </Card>
  );
};

export default Product;