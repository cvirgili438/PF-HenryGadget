import { Skeleton, Typography, IconButton, Link } from '@mui/material';
import { Box } from '@mui/system';
import React,{useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import style from './Cart.module.css'
import { TiShoppingCart } from 'react-icons/ti'
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { getAllCart, cleanCart, sendAllCart } from '../../Utils/cart/cartCrud.js';

const Cart = () => {     
        let [localCart, setLocalCart] = useState([]);
        const user = useSelector(state => state.user)

        const totalPrice= (cart)=>{
            let price= 0
            cart.map(e=>{
              return price = price + (e.price*(e.quantity))
            })
            return price
        }

        useEffect(() => {
          if (user) {
            if (sendAllCart(localCart, user.uid))
            cleanCart(null);
          }
        }, [user]);

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
        React.useEffect(async () => {
          if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
          }

          if(open)
          setLocalCart(await getAllCart(user && user.uid));

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
                   
                    {localCart?.length > 0?  localCart?.map((e,i) => {
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
                    {localCart?.length > 0 ? <MenuItem sx={{
                      color:'red',
                    }}>Total Price{totalPrice(localCart)}</MenuItem>: <></>}
                    <MenuItem><Typography variant='button' display="block" gutterBottom ><Link href='/cartpage' color="inherit" underline="none">Open cart</Link></Typography></MenuItem>
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