import React, { useState } from "react";
import { useDispatch , useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from "react-router-dom";
import { FiUserCheck } from 'react-icons/fi'
import { getProductsByQuery } from '../../Redux/Actions/products.js'
// import Button from '../Button/Button.jsx'; 
import logo from '../../Assets/logo.png'
import styles from './NavBar.module.css';
import ModalRegister from "../ModalRegister/ModalRegister.jsx";
import { useEffect } from "react";
import ProfileOptions from "../ProfileOptions/ProfileOptions.jsx";
import { setUserInFrontState } from "../../Redux/Actions/users.js";
import Cart from "../Cart/Cart.jsx";
import Button from '@mui/material/Button';
import { Button_contained_primary} from "../../Utils/MiuStyles/MiuStyles.js";
import { BsArrowBarRight } from 'react-icons/bs'
import SearchBar from "../SearchBar/SearchBar.jsx";
import { IconButton } from "@mui/material";

const NavBar = () => {

  const [input, setInput] = useState('');
  const [crud, setCrud] = useState({})
  const [modalShow, setModalShow] = useState(false);
  const [displayOptions, setDisplayOptions] = useState(false)

  const state = useSelector(state=>state)
  const dispatch = useDispatch();

  const {search,pathname} = useLocation()
  const history = useHistory()
  const query = new URLSearchParams(search)


  useEffect(()=>{
    if (pathname === '/Create/Product'){
      setCrud({create:true})
      return
    }
    else {
      setCrud({create:false})
    }
  },[pathname])

  useEffect(()=>{
    dispatch(getProductsByQuery(search))
  },[search])




  const handleInputChange = e => {
    setInput(e.target.value);

  };
  const handleSubmit = e => {
    e.preventDefault();
    query.set('name',input)   
    query.set('offset', 0) 
    dispatch(getProductsByQuery(search));
    history.push({search:query.toString()})
  };

  const handleClear = e => {
    e.preventDefault();
    
    query.delete("name")
    history.push({search:query.toString()})
    dispatch(getProductsByQuery(search));
    setInput('');
  };

  const handleDisplayOptions = ()=> {
    setDisplayOptions(!displayOptions)
  }

  const logOut = ()=>{
    setDisplayOptions(!displayOptions)
    localStorage.clear()
    dispatch(setUserInFrontState(null))
  }

 
  return (
    <div className={ styles.container }>
      <Link to='/'><img src={logo} alt='logo' className={ styles.logo }/></Link>
      <div className={ styles.center }>
          <SearchBar 
            type='text'
            name='name'
            placeholder="Search..."
            value={input}
            onChange={handleInputChange}
            onClick={[handleClear,handleSubmit]}
            input={input}
          />
      </div>
      <div className={ styles.menu }>
        <Cart />
        {state.user !== null
          ? (
            <div>
              {state.user.photoURL
              ? <img src={state.user.photoURL} alt='avatar' className={styles.login_button_avatar} onClick={handleDisplayOptions} referrerPolicy='no-referrer' />
              : (
                <IconButton style={{margin:'0 2rem 0 2rem'}}>
                  <FiUserCheck className={styles.login_button} onClick={handleDisplayOptions}/> 
                </IconButton>
              )
              }
             
              {!displayOptions
                ? null
                : <ProfileOptions logOut={logOut}/>
              }
            </div>
            )
          :
              <Button variant='contained' size='medium' endIcon={<BsArrowBarRight/>} sx={Button_contained_primary} onClick={()=>setModalShow(true)}> Log in </Button> 
        }

      </div>
      <ModalRegister 
        show={modalShow}
        onHide={() => setModalShow(false)}
        />
    </div>
  )
}

export default NavBar;