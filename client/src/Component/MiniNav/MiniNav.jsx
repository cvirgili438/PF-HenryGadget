import { React, useState, useEffect } from "react"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
import ButtonBorderEffect from "../Buttons/ButtonBorderEffect/ButtonBorderEffect"
import Cart from "../Cart/Cart";
import { getAllItemCart } from "../../Utils/cart/cartCrud.js";
import { Badge, styled } from "@mui/material";
import styles from './MiniNav.module.css'


const MiniNav = ({ pathname }) => {

    const [cartItems, setCartItems] = useState(0)
    const [user, setUser] = useState(null);
    const state = useSelector(state => state)

    useEffect(async () => {
        let items = state.user ? await getAllItemCart(state.user.uid) : await getAllItemCart()
        setCartItems(items)
    }, [state.refreshCart])

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    return (
        <div className={styles.main}>
            <Link to='/'>
                <span className={styles.separator}>
                    <ButtonBorderEffect text='Home' />
                </span>
            </Link>
            <Link to='/products'>
                <span className={styles.separator}>
                    <ButtonBorderEffect text='Store' />
                </span>
            </Link>
            {pathname === '/'
                ? (
                    <>
                        <a href="#anchor-services">
                            <span className={styles.separator}>
                                <ButtonBorderEffect text='Our services' />
                            </span>
                        </a>
                        <a href='#anchor-featured'>
                            <span className={styles.separator}>
                                <ButtonBorderEffect text='Featured products' />
                            </span>
                        </a>
                        <Link to={'/aboutUs'}>
                            <span className={styles.separator}>
                                <ButtonBorderEffect text='About us' />
                            </span>
                        </Link>
                    </>
                )
                :
                null
            }
            <div className={styles.cart}>
                {
                    cartItems ?
                        <StyledBadge
                            style={{ verticalAlign: 'sub' }}
                            // sx={{varticalAlign: 'sub'}}
                            badgeContent={cartItems}
                            color="primary">
                            <Cart />
                        </StyledBadge> : <Cart />
                }
            </div>
        </div>

    )
}



export default MiniNav