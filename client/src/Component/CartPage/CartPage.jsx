import React, {useEffect} from 'react'
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

import { useDispatch, useSelector } from 'react-redux';
// import { cartProducts } from '../../Redux/Actions/cart';


const CartPage = () => {

  const dispatch = useDispatch()
  let cartlocal = JSON.parse(localStorage.getItem('cart'))   
  console.log(cartlocal)  

  const productInCart = cartlocal.map(e => e.idProduct)
  console.log(productInCart) 

 

  const cart = useSelector(state => state.cartProducts)
  console.log(cart.result)

  // if (cart === [] && productInCart !== []) {
  //   dispatch(cartProducts(productInCart))
  // }

  useEffect(() => {
    
  }, [])

  

  let handleCount = (e) => {


  }

  let handlerChange = (e) => {


  }

  return (
    <Box className={styles.container}>

      <Box 
      className={styles.subcontainer1}
      >
        <Box>
          <img  style={{width: "80px", margin: "20px"}} alt=""/>
        </Box>
        <Box>
          <Grid 
            container 
            justifyContent="space-between" 
          >
            <Grid item xs={6}>
              <Box>
                <Typography variant='h6'>{}</Typography>
                <Typography variant='body1'>Model: </Typography>
              </Box>
            </Grid>

            <Grid item  xs={6}>
              <Box>
                <Typography variant='h6'>Total parcial: ${} </Typography>
                <Typography variant='h6'>Total unitario: ${} </Typography>
              </Box>
            </Grid>
          </Grid>

          <Box 
          sx={{display: "flex", justifyContent: "space-around", width: "50vw", marginTop: "20px"}}
          >
            
            <Box>
                <Button onClick={e => handleCount(e)} id="minus" className={`${styles.btn_minus}`}><RemoveIcon onClick={e => handleCount(e)} ></RemoveIcon></Button>
                <Input  
                  sx={{width: "40px", border: "1px solid gray"}}
                  onChange={e => handlerChange(e)}  />
                <Button 
                 onClick={e => handleCount(e)} id="plus" className={`${styles.btn_plus}`}><AddIcon  onClick={e => handleCount(e)} ></AddIcon></Button>                            
            </Box>

            <Box>
              <Button aria-label="delete">
                <DeleteForeverIcon />
              </Button>
            </Box>
            
          </Box>
        </Box>
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
          <Box><Typography variant='h3'>$</Typography></Box>
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
  )
}

export default CartPage