import { Menu, Skeleton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLocalCart } from '../../Redux/Actions/cart';
import style from './Cart.module.css'
import { HiOutlineShoppingCart } from 'react-icons/hi'
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';


const Cart = () => {
        const dispatch = useDispatch()
        let storage = JSON.parse(localStorage.getItem('cart'))
        const localCart = useSelector(state => state.localCart)
        const user = useSelector(state => state.user)
        const userCart = useSelector(state => state.userCart)
        const totalPrice= (cart)=>{
            let price= 0
            cart.map(e=>{
              return price = price + e.price
            })
            return price
        }
       
        useEffect(()=>{
        if(user === [] || user === undefined || user === null){
          dispatch(setLocalCart(storage))
        }
        if(user){
          
        }
        },[user,storage])


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
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
           <HiOutlineShoppingCart className={style.cart}/>
        </Button>
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
                    }}
                  >                    
                    {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                    {localCart.length > 0 ?  localCart?.map((e,i) => {
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
                          <Typography variant='h6' >{e.name}</Typography>
                          <Typography variant='subtitle1' sx={{
                            
                          }} > Price ${e.price}</Typography>
                          </Box>
                        </Box>
                      </MenuItem>
                    }):<MenuItem>You haven't products in your Cart</MenuItem>}
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