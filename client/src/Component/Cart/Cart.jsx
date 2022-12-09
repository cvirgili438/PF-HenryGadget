import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProductsInCart } from '../../Redux/Actions/cart';
import style from './Cart.module.css'

const Cart = () => {
        const dispatch = useDispatch()
        let storage = localStorage.getItem('cart')
        const cart = useSelector(state => state.cart)

       
        useEffect(()=>{
        if(storage !== null && storage !== undefined){
            let parse = JSON.parse(storage)
            dispatch(setProductsInCart(parse))
        } 
        },[storage])
    return (
      <Box sx={{
        maxWidth:'auto',
        maxHeight:'auto'
      }}>
        { cart?.map((element,index)=>{
            return (
                <Box sx={{
                    display:'flex',
                }}  key={index}>
                <img className={style.img} src={element.img} key={index} alt='img not available'/>
                <Typography variant='h6'  key={index+'name'} >{element.name}</Typography>
                <Typography variant='subtitle1'  key={index+'price'}>{element.price}</Typography>
                </Box>
            )
        })}
      </Box>
    );
};

export default Cart;