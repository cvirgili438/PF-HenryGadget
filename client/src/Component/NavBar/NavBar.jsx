import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from "react-router-dom";
import { FiUserCheck } from 'react-icons/fi'
import { getProductsByQuery } from '../../Redux/Actions/products.js'
import logo from '../../Assets/logo.png'
import styles from './NavBar.module.css';
import { useEffect } from "react";
import ProfileOptions from "../ProfileOptions/ProfileOptions.jsx";
import { setUserInFrontState } from "../../Redux/Actions/users.js";
import Cart from "../Cart/Cart.jsx";
import Button from '@mui/material/Button';
import { Button_contained_primary } from "../../Utils/MiuStyles/MiuStyles.js";
import { BsArrowBarRight } from 'react-icons/bs'
import SearchBar from "../SearchBar/SearchBar.jsx";
import { IconButton, Badge } from "@mui/material";
import ModalUser from "../ModalRegister/Modal.jsx";
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { app } from "../../Firebase/firebase.config";
import { getAllCart } from "../../Utils/cart/cartCrud.js";


import { logUserActivity } from "../../Redux/Actions/users.js";

const NavBar = () => {



  const [input, setInput] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [displayOptions, setDisplayOptions] = useState(false)
  const [cartItems, setCartItems] = useState(0)

  const state = useSelector(state => state)
  const dispatch = useDispatch();

  const { search } = useLocation()
  const history = useHistory()
  const query = new URLSearchParams(search)
  
  const [user, setUser] = useState(null);
  const auth = getAuth(app);

  useEffect(() => {
    if (!search && state.filteredProducts.length === 0)
      dispatch(getProductsByQuery(search))
    if (search)
      dispatch(getProductsByQuery(search))

    onAuthStateChanged(auth, (user) => {
      if (user) dispatch(logUserActivity(user))
    });

  },[search])

  useEffect(async () => {
    let cart = state.user ? await getAllCart(state.user.uid) : await getAllCart()
    setCartItems(cart.length)
  }, [state.refreshCart])
  console.log(cartItems);
  const handleInputChange = e => {
    setInput(e.target.value);

  };
  const handleSubmit = e => {
    e.preventDefault();
    query.set('name', input)
    query.set('offset', 0)
    history.push({ search: query.toString() })
  };


  const handleClear = e => {
    e.preventDefault();
    query.delete("name")
    history.push({ search: query.toString() })
    setInput('');
    dispatch(getProductsByQuery(search));
  };

  const handleDisplayOptions = () => {
    setDisplayOptions(!displayOptions)
  }

  const firebaseAuth = getAuth(app)
  const logOut = () => {
    setDisplayOptions(!displayOptions)
    localStorage.clear()
    dispatch(setUserInFrontState(null))
    signOut(firebaseAuth).catch(e => { console.log(e) })
  }


  return (
    <div className={styles.container}>
      <Link to='/'><img src={logo} alt='logo' className={styles.logo} /></Link>
      <div className={styles.center}>
        <SearchBar
          type='text'
          name='name'
          placeholder="Search..."
          value={input}
          onChange={handleInputChange}
          onClick={[handleClear, handleSubmit]}
          input={input}
        />
      </div>
      <div className={styles.menu}>
        {
          cartItems ?
            <Badge badgeContent={cartItems} color="primary">
              <Cart />
            </Badge> : <Cart />
        }
        {state.user !== null
          ? (
            <div>
              {state.user.photoURL
                ? <img src={state.user.photoURL} alt='avatar' className={styles.login_button_avatar} onClick={handleDisplayOptions} referrerPolicy='no-referrer' />
                : (
                  <IconButton style={{ margin: '0 2rem 0 2rem' }}>
                    <FiUserCheck className={styles.login_button} onClick={handleDisplayOptions} />
                  </IconButton>
                )
              }

              {!displayOptions
                ? null
                : <ProfileOptions displayOptions={displayOptions} setDisplayOptions={setDisplayOptions} logOut={logOut} />
              }
            </div>
          )
          :
          <Button variant='contained' size='medium' endIcon={<BsArrowBarRight />} sx={Button_contained_primary} onClick={() => setModalShow(true)}> Log in </Button>
        }

      </div>
      <ModalUser
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  )
}

export default NavBar;