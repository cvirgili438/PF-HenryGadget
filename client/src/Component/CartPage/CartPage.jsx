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
      
      

      {/* total section */}

      <Box className={styles.subcontainer2}>
        <Box sx={{borderBottom: "1px solid gray", paddingBottom: "20px"}}>
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Box><Typography variant='body1'>Total parcial</Typography></Box>
            <Box><Typography variant='body1'>$ {totalPrice(localCart)}</Typography></Box>
          </Box>
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Box><Typography variant='body1'>Total descuento</Typography></Box>
            <Box><Typography variant='body1'>$ {totalDiscount(localCart)}</Typography></Box>
          </Box>
        </Box>
        <Box sx={{display: "flex", justifyContent: "space-between", margin: "20px 0", borderBottom: "1px solid gray", paddingBottom: "20px"}}>
          <Box><Typography variant='h3'>Total</Typography></Box>
          <Box><Typography variant='h3'>$ {totalPrice(localCart) - totalDiscount(localCart)}</Typography></Box>
        </Box>
        <Box sx={{margin: "20px 0"}}>
          <Typography variant='body1' align='left'>El costo y días de envío serán calculados, después de ingresar la ciudad destino y tipo de envío</Typography>
        </Box>

        <Box sx={{margin: "20px 0"}}>
          <Typography variant='subtitle1' align='left'>Puede pagar con:</Typography>
          <List sx={{display: "flex", flexDirection: "column"}}>
            <ListItem>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText primary="Tarjeta de Crédito / Débito"/>
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText primary="PSE"/>
            </ListItem>
          </List>
        </Box>
        
      </Box>
      
    </Box>
    )}

    </Box>
  )
}

export default CartPage