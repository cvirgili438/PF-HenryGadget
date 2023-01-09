import React, {useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import styles from './CartPage.module.css'

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { ListItemText } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

import { useSelector, } from 'react-redux';
import { getAllCart } from '../../Utils/cart/cartCrud.js';
import CartPageUnit from './CartPageUnit/CartPageUnit';
import Total from "./Total.jsx"


const CartPage = () => {

  const history = useHistory();

  let [localCart, setLocalCart] = useState([]);
  const user = useSelector(state => state.user)

  const totalPrice= (cart)=>{
    let price= 0
    cart.map(e=>{
      return price = price + (e.price*(e.quantity))
    })
    return price
  }

  const totalDiscount = (cart) => {
    let discount = 0;
    cart.map(e => {
      return discount = discount + (e.price * (e.discount/100))
    })
    return discount
  }
  

  useEffect(async () => {
    setLocalCart(await getAllCart(user && user.uid));
    let button = document.getElementById('stepper-button')
    if(button.className.includes(' Mui-disabled')){
      let location = button.className.indexOf(' Mui-disabled')
      button.className = button.className.slice(0,location)
    }
  }, [user])

  return (
    <Box className={styles.mainContainer}>
    {(localCart.length === 0) ? (
      <Box className={styles.vacio}>
        <Typography variant='h2'>Tu carrito esta vacio</Typography>
        <Button 
          variant="contained" 
          size='large' 
          sx={{borderRadius: "10px", marginTop: "20px"}}
          onClick={() => history.push("/")}>
            Continuar comprando
        </Button>
      </Box>
    ) : (
      <Box className={styles.container}>

      <Box>
        {localCart?.map((el, index) => {
          return(
            <CartPageUnit 
              key={el.idProduct}
              item={el} 
              user={user} 
              localCart={localCart} 
              setLocalCart={setLocalCart} 
              index={index}
            />
          )
        })}
      </Box>
      
      <Total/>
      
    </Box>
    )}

    </Box>
  )
}

export default CartPage