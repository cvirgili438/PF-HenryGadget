import { Menu, Skeleton, Typography, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserCart, getUserCart, setLocalCart, setUserCart } from '../../Redux/Actions/cart';
import style from './Cart.module.css'
import { TiShoppingCart } from 'react-icons/ti'
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useState } from 'react';


const Cart = () => {
        const dispatch = useDispatch()
        let storage = JSON.parse(localStorage.getItem('cart'))        
        const localCart = useSelector(state => state.localCart)
        const user = useSelector(state => state.user)
        const userCart = useSelector(state => state.userCart)
        const [loggin,setLoggin] = useState(false)
        const totalPrice= (cart)=>{
            let price= 0
            cart.map(e=>{
              return price = price + (e.price*(e.quantity))
            })
            return price
        }
       // dSV9EBqJ4qZZ5jHrjGzlWu7paha2
        useEffect(() => {
          
          if ((user === [] || user === undefined || user === null) && storage) {
            dispatch(setLocalCart(storage));
          }
          
          if (user) {                                     // si el usuario esta logueado
            
            if (storage) {                                // si hay un carrito en el localstorage
              dispatch(setUserCart(storage, user.uid))    // lo mando a la BD
              
            } else {                                      // si no hay nada en el localstorage
              if (localCart.length === 0) {               // y no hay nada en el carrito local
                dispatch(getUserCart(user.uid));          // traigo el carrito de la BD
              }
            }
            // dispatch(getUserCart(user.uid));
            // if (userCart) {
            // }
          }
        }, [localStorage.getItem('cart'),user]);


        //de aqui a adelante es  estados sobre el boton en si
        const [open, setOpen] = React.useState(false);
        const anchorRef = React.useRef(null);
      
        const handleToggle = () => {
          setOpen((prevOpen) => !prevOpen);
        };
      
        const handleClose = (event) => {
          if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
          }
      
          setOpen(false);
        };
      
        function handleListKeyDown(event) {
          if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
          } else if (event.key === 'Escape') {
            setOpen(false);
          }
        }
      
        // return focus to the button when we transitioned from !open -> open
        const prevOpen = React.useRef(open);
        React.useEffect(() => {
          if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
          }
      
          prevOpen.current = open;
        }, [open]);
    return (
      <div >

        <IconButton
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
           <TiShoppingCart className={style.cart}/>
        </IconButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                    sx={{
                      display:'flex',
                      flexDirection:'column'
                    }}                  >                    
                   
                    {localCart.length > 0?  localCart?.map((e,i) => {
                      return <MenuItem key={'menu'+i}>
                        <Box sx={{
                          display:'flex',
                          flexDirection: 'row'
                        }} >
                        <img width='30%' 
                        height='30px' 
                        src={e.img} 
                        alt={<Skeleton variant='rectangular'  />}/>
                        <Box  sx={{
                          display:'grid',
                          gridAutoRows:'auto'
                          
                        }}>
                          <Typography variant='h6' >{e.quantity}u.  of {e.name}</Typography>
                          <Typography variant='subtitle1' sx={{
                            
                          }} > Price ${e.price}</Typography>
                          </Box>
                        </Box>
                      </MenuItem>
                    }):<MenuItem>You have no items in your shopping cart</MenuItem>}
                    {localCart.length > 0 ? <MenuItem sx={{
                      color:'red',
                    }}>Total Price{totalPrice(localCart)}</MenuItem>: <></>}
                    <MenuItem onClick={handleClose} ><Typography variant='button' display="block" gutterBottom >Close</Typography></MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
};

export default Cart;