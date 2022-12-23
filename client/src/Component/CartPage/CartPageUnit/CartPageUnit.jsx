import React, {useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styles from './CartPageUnit.module.css'

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Input, Alert } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Grid from '@mui/material/Grid';

import { useSelector, } from 'react-redux';

import { getAllCart, updateProductCart, deleteProductCart } from '../../../Utils/cart/cartCrud';

const CartPageUnit = (props) => {

    const user = useSelector(state => state.user)

    let [quantityl, setQuantity] = useState(props.item.quantity)
    let [remove, setRemove] = useState(false)
    let [checkStock, setCheckStock] = useState(false)

    useEffect(async () => {
        if (remove) {
            deleteProductCart(props.item.idProduct, props.user && props.user.uid, 0)
            props.setLocalCart(await getAllCart(user && user.uid));
        }else{
            setCheckStock(quantityl > props.item.stock)
            updateProductCart(props.item.idProduct, props.user && props.user.uid, quantityl)
        }
        
        props.setLocalCart(await getAllCart(user && user.uid));
    }, [quantityl, remove])

   

    let handleCount = (e) => {
        if (e.target.id === 'minus') {
            Input.value === 1 ? setQuantity(1)
                : setQuantity(Number(quantityl) - 1)
        }
        else if (e.target.id === 'plus') {
            setQuantity(Number(quantityl) + 1)
        }
    }
    
      let handlerChange = (e) => {
        setQuantity(e.target.value)
      }

      let handlerDelete = (e) => {
        setRemove(true)
      }

  return (
    <Box key={props.item.idProduct} className={styles.subcontainer1} >
        <Box>
            <Link to={`/product/${ props.item.idProduct }`}>
                <img className={styles.img} src={props.item.img}  alt=""/>
            </Link>
        </Box>
        <Box>
            <Grid 
                container 
                justifyContent="space-between" 
            >
                <Grid item xs={6}>
                <Box>
                    <Typography variant='h6'>{props.item.name}</Typography>
                    <Typography variant='body1'>Model: {props.item.model}</Typography>
                </Box>
                </Grid>

                <Grid item  xs={6}>
                <Box>
                    <Typography variant='h6'>Total unitario: ${props.item.price} </Typography>
                    <Typography variant='h6'>Total parcial: ${props.item.price * quantityl} </Typography>
                </Box>
                </Grid>
            </Grid>

            <Box>
            
                <Box
                    sx={{display: "flex", justifyContent: "space-around", width: "50vw", marginTop: "20px"}}
                >
                    <Box>
                        <Button onClick={e => handleCount(e)} id="minus" className={`${styles.btn_minus}`}>
                            <RemoveIcon id="minus" />
                        </Button>
                        <Input  
                        type='number'
                        sx={{width: "40px", border: "1px solid gray"}}
                        value={quantityl}
                        onChange={e => handlerChange(e)}  />
                        <Button onClick={e => handleCount(e)} id="plus" className={`${styles.btn_plus}`}>
                            <AddIcon id="plus" ></AddIcon>
                        </Button>                            
                    </Box>

                    <Box>
                        <Button onClick={e => handlerDelete(e)} aria-label="delete">
                            <DeleteForeverIcon />
                        </Button>
                    </Box>

                </Box>
                <Box>
                    {checkStock && <Alert xs={{ width: 100 }} sx={{marginTop: "10px"}}
                        variant="outlined" severity="error">
                        There is not enough stock!
                    </Alert>}
                </Box>
                    
            </Box>
        </Box>
    </Box>
  )
}

export default CartPageUnit