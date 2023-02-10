import { Skeleton, Typography, IconButton, Divider } from '@mui/material';
import { Box } from '@mui/system';
import React,{useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styles from './Cart.module.css'

const Cart = (props) => {     
        let [localCart, setLocalCart] = useState([]);
        const user = useSelector(state => state.user)
        const history = useHistory();

        const totalPrice= (cart)=>{
            let price= 0
            cart.map(e=>{
              return price = price + (e.price*(e.quantity))
            })
            return price
        }

        useEffect(async () => {
          if (user) {
            await sendAllCart(JSON.parse(localStorage.getItem('cart')) || [], user.uid);
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

        const handleOpenCart = (event) => {
          if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
          }
      
          setOpen(false);
          history.push("/checkout")
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

          if(open) // Cargar el carrito cadsa vez que es despolegado.
          setLocalCart(await getAllCart(user && user.uid));

          prevOpen.current = open;
        }, [open]);

    return (
      <div style={props.cartItems ? {marginTop:'8px'} : {marginRight:'2rem'}}>
          <ShoppingCartIcon 
            className={style.cart} 
            sx={{width:'2.2rem',height:'2.2rem'}}
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          />
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
          sx={{width:'28rem'}}
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
                  <Box>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                    sx={{
                      display:'flex',
                      flexDirection:'column',
                      overflowY:'auto',
                      maxHeight:'20rem',
                    }}    
                    className={styles.scrollbar}           
                   >                    

                    {localCart?.length > 0?  localCart?.map((e,i) => {
                      return <MenuItem key={'menu'+i}>
                        <Box sx={{
                          display:'flex',
                          overflow:'hidden',
                          width:'100%',
                          borderBottom:'1px dotted #198754',
                          paddingBottom:'10px'
                        }} >
                          <img 
                          style={{
                            width:'5rem',
                            heigth:'5rem',
                            objectFit:'contain'
                          }}
                          src={e.img} 
                          alt={<Skeleton variant='rectangular'  />}/>
                          <Box  sx={{
                            flex:'flex',
                            flexDirection:'column',
                            alignItems:'center',
                            width:'100%'
                          }}>
                            <Typography variant='h6' > {e.name}  </Typography>
                            <Typography>
                              <p style={{fontWeight:'bold',display:'inline-block',color:'#198754',}}>{`$${e.price}`}</p> x {e.quantity} units</Typography>
                            <Typography variant='subtitle1' sx={{
                                
                              }} > Sub Total: ${e.price*e.quantity}</Typography>
                          </Box>
                        </Box>
                      </MenuItem>
                    }):<MenuItem>You have no items in your shopping cart</MenuItem>}
                   
                  </MenuList>
                  {localCart?.length > 0 ? <MenuItem sx={{
                      color:'#198754',
                      
                    }}>
                      <Box sx={{
                        display:'flex',
                        justifyContent:'center',
                        height:'2rem',
                        marginTop:'1rem',
                        width:'100%'
                      }}>
                        <Typography sx={{
                          marginRight:'0.3rem'
                        }}>
                          Total Price: 
                        </Typography>
                        <Typography sx={{
                          fontSize:'1.1rem'
                          }}>
                            ${totalPrice(localCart)}
                        </Typography>
                      </Box>
                      </MenuItem>: null}
                    <Divider 
                        variant='middle'
                        sx={{
                          backgroundColor:'#198754',
                          height:'0.2rem'
                        }}
                      />
                    <MenuItem onClick={handleOpenCart}><Typography variant='button' display="block" gutterBottom  >Open cart</Typography></MenuItem>
                    <MenuItem onClick={handleClose} ><Typography variant='button' display="block" gutterBottom >Close</Typography></MenuItem> 
                  </Box>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
};

export default Cart;