import React, {useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import styles from './Total.module.css'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { ListItemText } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useSelector, } from 'react-redux';
import { getAllCart } from '../../Utils/cart/cartCrud.js';

const Total = (props) => {

  const user = useSelector(state => state.user)
  const [total, setTotal] = useState("");
  const [totalDiscount, setTotalDiscount] = useState("");

  const totalPrice= (cart)=>{
    let price= 0
    cart.map(e=>{
      return price = price + (e.price*(e.quantity))
    })
    return price
  }

  const totalDiscountF = (cart) => {
    let discount = 0;
    cart.map(e => {
      return discount = discount + (e.price * (e.discount/100))
    })
    return discount
  }

  useEffect(async() => {
    if (props.localCart) {
      setTotal(totalPrice(props.localCart));
      setTotalDiscount(totalDiscountF(props.localCart))
    }else{
      let cart = await getAllCart(user && user.uid);
      setTotal(totalPrice(cart));
      setTotalDiscount(totalDiscountF(cart))
    }
  }, [props.localCart])

  return (
      <Box className={styles.subcontainer2}>
        <Box sx={{borderBottom: "1px solid gray", paddingBottom: "20px"}}>
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Box><Typography variant='body1'>Product</Typography></Box>
            <Box><Typography variant='body1'>$ {total}</Typography></Box>
          </Box>
          {/* <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Box><Typography variant='body1'>Discount</Typography></Box>
            <Box><Typography variant='body1'>$ {totalDiscount}</Typography></Box>
          </Box> */}
        </Box>
        <Box sx={{display: "flex", justifyContent: "space-between", margin: "20px 0", borderBottom: "1px solid gray", paddingBottom: "20px"}}>
          <Box><Typography variant='h3'>Total</Typography></Box>
          <Box><Typography variant='h3'>$ {total - totalDiscount}</Typography></Box>
        </Box>
        <Box sx={{margin: "20px 0"}}>
          <Typography variant='body1' align='left'>Shipping timelines and costs will be calculated in base of your shipping address and shipping method.</Typography>
        </Box>

        <Box sx={{margin: "20px 0"}}>
          <Typography variant='subtitle1' align='left'>You can pay with:</Typography>
          <List sx={{display: "flex", flexDirection: "column"}}>
            <ListItem>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText primary="Credit / Debit Card"/>
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText primary="PayPal"/>
            </ListItem>
          </List>
        </Box>
        
      </Box>
  )
}

export default Total