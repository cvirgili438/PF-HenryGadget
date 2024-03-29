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
import { IconButton, Badge, ListSubheader } from "@mui/material";
import ModalUser from "../ModalRegister/Modal.jsx";
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { app } from "../../Firebase/firebase.config";
import { getAllItemCart, emptyCart } from "../../Utils/cart/cartCrud.js";
// import ButtonBorderEffect from "../Buttons/ButtonBorderEffect/ButtonBorderEffect.jsx";
// import { getAllCart } from "../../Utils/cart/cartCrud.js";
import { logUserActivity } from "../../Redux/Actions/users.js";
// import { Box, } from "@mui/system";
import MiniNav from "../MiniNav/MiniNav.jsx";
import { URL } from "../../Redux/Constants/index.js";
// import Separator from "../Separator/Separator.jsx";
import axios from 'axios'


const NavBar = () => {

  const loggedUser = useSelector(state => state.user);

  const [input, setInput] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [displayOptions, setDisplayOptions] = useState(false)
  // const [cartItems, setCartItems] = useState(0)
  const [providerUser,setProviderUser] =useState([])
  const state = useSelector(state => state)
  const dispatch = useDispatch();

  const { search, pathname } = useLocation()
  const history = useHistory()
  const query = new URLSearchParams(search)

  // const [user, setUser] = useState(null);
  const auth = getAuth(app);

  useEffect(() => {
    if (!search && state.filteredProducts.length === 0)

      dispatch(getProductsByQuery(search))
    if (search)
      dispatch(getProductsByQuery(search))

    
    if (loggedUser) dispatch(logUserActivity(loggedUser))
    onAuthStateChanged(auth, (user) => {
      if (user) {
       
        axios.get(`${URL}/users/${user.uid}`).then(r => {         
          return setProviderUser({
          ...user.providerData[0],
          uid:user.uid,
          phoneNumber:r.data.result.phoneNumber
        })}
        )
        setUserInFrontState(providerUser)
      }
    });
    
  }, [search, loggedUser])


  // useEffect(async () => {
  //   let items = state.user ? await getAllItemCart(state.user.uid) : await getAllItemCart()
  //   setCartItems(items)
  // }, [state.refreshCart])

  const handleInputChange = e => {
    setInput(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();

    if(pathname !== '/products'){
      history.push('/products')
    }
   
    query.set('name',input)   
    query.set('offset', 0)
    
    history.push({search:query.toString()})
    setInput('')
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
    emptyCart();
    history.push('/');
  }

  const handlePress = (e) => {
    if (e.key === "Enter") {
      if(pathname !== '/products'){
        history.push('/products')
      }
     
      query.set('name',input)   
      query.set('offset', 0)
      
      history.push({search:query.toString()})
      setInput('')
    }
  };
 
  return (
    <div className={styles.main} >
      <div className={styles.container}>
        <div style={{ display: 'flex' }}>
        <Link onClick={()=>setInput('')} to='/'><img src={logo} alt='logo' className={ styles.logo }/></Link>
        <div className={ styles.center }>
            <SearchBar 
              type='text'
              name='name'
              placeholder="Search..."
              value={input}
              onChange={handleInputChange}
              onClick={[handleClear, handleSubmit]}
              input={input}
              setInput={setInput}
              pathname={pathname}
              history={history}
              search={search}
              query={query}
              handlePress={handlePress}
            />
          </div>
          <div className={styles.menu}>
            
            {state.user !== null
              ? (
                <div>
                  {providerUser.photoURL
                    ? <img src={providerUser.photoURL?providerUser.photoURL: 'avatar' } alt='avatar' className={styles.login_button_avatar} onClick={handleDisplayOptions} referrerPolicy='no-referrer' />
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
        </div>        
        <ModalUser
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
      {
        !loggedUser || loggedUser.rol !== 'admin' ?
          <MiniNav pathname={pathname} setInput={setInput}/>
          :
          <></>
      }

    </div>
  )
}

export default NavBar;