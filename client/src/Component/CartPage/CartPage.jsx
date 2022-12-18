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
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Input } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Grid from '@mui/material/Grid';

import { useDispatch, useSelector, } from 'react-redux';
import { getAllCart, cleanCart, sendAllCart } from '../../Utils/cart/cartCrud.js';
import { addProductCart } from '../../Utils/cart/cartCrud.js';
import CartPageUnit from './CartPageUnit/CartPageUnit';


const CartPage = () => {

  const history = useHistory();

  let [localCart, setLocalCart] = useState([]);
  const user = useSelector(state => state.user)

  // const dispatch = useDispatch()
  // let cartlocal = JSON.parse(localStorage.getItem('cart'))   
  // console.log(cartlocal)  
  console.log(localCart)
  console.log(user)

  const totalPrice= (cart)=>{
    let price= 0
    cart.map(e=>{
      return price = price + (e.price*(e.quantity))
    })
    return price
  }

  

  useEffect(async () => {
    setLocalCart(await getAllCart(user && user.uid));
    // console.log(localCart)
  }, [])

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
            <CartPageUnit item={el} user={user} localCart={localCart} setLocalCart={setLocalCart} index={index}/>
            // <Box key={index} className={styles.subcontainer1} >
            //   <Box>
            //     <img src={el.img} style={{width: "80px", margin: "20px"}} alt=""/>
            //   </Box>
            //   <Box>
            //     <Grid 
            //       container 
            //       justifyContent="space-between" 
            //     >
            //       <Grid item xs={6}>
            //         <Box>
            //           <Typography variant='h6'>{el.name}</Typography>
            //           <Typography variant='body1'>Model: ${el.model}</Typography>
            //         </Box>
            //       </Grid>

            //       <Grid item  xs={6}>
            //         <Box>
            //           <Typography variant='h6'>Total parcial: ${el.price} </Typography>
            //           <Typography variant='h6'>Total unitario: ${el.price * el.quantity} </Typography>
            //         </Box>
            //       </Grid>
            //     </Grid>

            //     <Box 
            //     sx={{display: "flex", justifyContent: "space-around", width: "50vw", marginTop: "20px"}}
            //     >
                  
            //       <Box>
            //           <Button onClick={e => handleCount(e)} id="minus" className={`${styles.btn_minus}`}><RemoveIcon onClick={e => handleCount(e)} ></RemoveIcon></Button>
            //           <Input  
            //             type='number'
            //             sx={{width: "40px", border: "1px solid gray"}}
            //             value={el.quantity}
            //             onChange={e => handlerChange(e)}  />
            //           <Button 
            //           onClick={e => handleCount(e)} id="plus" className={`${styles.btn_plus}`}><AddIcon  onClick={e => handleCount(e)} ></AddIcon></Button>                            
            //       </Box>

            //       <Box>
            //         <Button aria-label="delete">
            //           <DeleteForeverIcon />
            //         </Button>
            //       </Box>
                  
            //     </Box>
            //   </Box>
            // </Box>
            
          )
        })}
      </Box>
      
      

      {/* total section */}

      <Box className={styles.subcontainer2}>
        <Box sx={{borderBottom: "1px solid gray", paddingBottom: "20px"}}>
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Box><Typography variant='body1'>Total parcial</Typography></Box>
            <Box><Typography variant='body1'>$</Typography></Box>
          </Box>
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Box><Typography variant='body1'>Descuento parcial</Typography></Box>
            <Box><Typography variant='body1'>$</Typography></Box>
          </Box>
        </Box>
        <Box sx={{display: "flex", justifyContent: "space-between", margin: "20px 0", borderBottom: "1px solid gray", paddingBottom: "20px"}}>
          <Box><Typography variant='h3'>Total</Typography></Box>
          <Box><Typography variant='h3'>$ {totalPrice(localCart)}</Typography></Box>
        </Box>
        <Box sx={{margin: "20px 0"}}>
          <Typography variant='body1' align='left'>El costo y días de envío serán calculados, después de ingresar la ciudad destino y tipo de envío</Typography>
        </Box>
        <Button variant="contained" size='large' fullWidth
           sx={{borderRadius: "10px"}}
        >
          Continuar
        </Button> 

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