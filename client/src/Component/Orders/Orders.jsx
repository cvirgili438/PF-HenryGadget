import React, { useEffect } from 'react'
import { useDispatch, useSelector, } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { getOrders } from '../../Redux/Actions/order';

import styles from './Orders.module.css'

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Orders = () => {

    const history = useHistory();
    const dispatch = useDispatch()

    const order = useSelector(state => state.order)
    const userid = useSelector(state => state.user.uid)

    useEffect(() => {
        dispatch(getOrders(userid))
    }, [])

  return (
    <Box className={styles.mainContainer}>
        <Typography variant='h3'>Your Orders</Typography>
        {(order.length === 0) ? (
            <Box className={styles.vacio}>
                <Typography variant='h2'>You have not made any purchase yet</Typography>
                <Button 
                variant="contained" 
                size='large' 
                sx={{borderRadius: "10px", marginTop: "20px"}}
                onClick={() => history.push("/")}>
                    Continuar comprando
                </Button>
            </Box>
            ) : (
                <Box>
                    {order?.map((el, index) => {
                        let id = el.id
                    return(
                        <Box 
                            className={styles.containerOrder}
                            key={el.id}
                            id={el.id}
                        >
                            <Box className={styles.left}>
                                <Typography >Order Number: {el.id}</Typography>
                                <Typography >Order Status: {el.status.toUpperCase()}</Typography>
                                <Typography >Order Total Cost: ${el.total}</Typography>
                                <Typography >Order Date: {el.created.split("T")[0]}</Typography>
                            </Box>
                            <Box className={styles.right}>
                                <Button variant='contained'><Link className={styles.link} to={`/orderdetail/${ id }`}>See Details</Link></Button>
                            </Box>
                            
                        </Box>
                    )
                    })}
                </Box>
            )}
    </Box>
  )
}

export default Orders