import React, { useEffect } from 'react'
import { useDispatch, useSelector, } from 'react-redux';
import { getOrders } from '../../Redux/Actions/order';

import styles from './Orders.module.css'

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Orders = () => {

    const dispatch = useDispatch()

    const order = useSelector(state => state.order)
    const userid = useSelector(state => state.user.uid)
    console.log(order)
    console.log(userid)

    useEffect(() => {
        dispatch(getOrders(userid))
    }, [])

  return (
    <Box className={styles.mainContainer}>
        <Typography variant='h3'>Your Orders</Typography>
    </Box>
  )
}

export default Orders