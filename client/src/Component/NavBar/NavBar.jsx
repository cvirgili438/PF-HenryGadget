import React, { useState } from "react";
import { useDispatch , useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from "react-router-dom";
import { FaUserInjured } from 'react-icons/fa'
import { HiOutlineShoppingCart } from 'react-icons/hi'

import { getProductsByQuery } from '../../Redux/Actions/products.js'

import Button from '../Button/Button.jsx';
import Input from "../Input/Input.jsx";

import logo from '../../Assets/logo.png'

import styles from './NavBar.module.css';
import ModalRegister from "../ModalRegister/ModalRegister.jsx";
import { useEffect } from "react";

const NavBar = () => {
  const state = useSelector(state=>state)
  const [input, setInput] = useState('');
  const [crud, setCrud] = useState({})
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const handleInputChange = e => {
    setInput(e.target.value);
  };
  const {search,pathname} = useLocation()
  const history = useHistory()
  const query = new URLSearchParams(search)
  const handleSubmit = e => {
    e.preventDefault();
    query.set('name',input)    
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

  return (
    <div className={ styles.container }>
      <img src={logo} alt='logo' className={ styles.logo }/>
      <Button  text={'Back'}  onClick={history.goBack}/>
      <div className={ styles.center }>
        <Input
          type='text'
          name='name'
          placeholder="Type text..."
          value={input}
          onChange={handleInputChange}
          />
        {
          input ?
          <Button text='❌' onClick={handleClear} />
          :
          <></>
        }
        {
          !input
          ?
          <Button text='Search' disabled={ true } />
          :
          
          <Button text='Search' onClick={handleSubmit} />
        
          
        }
        {/* {
          !crud.create ? (<Link to='/Create/Product' >
          <Button text='Create Product'  />
      </Link>) : <></>
        } */}

      {/* <Link to='/Create/Product' >
          <Button text='Create Product'  />
      </Link> */}
      
      </div>
      <div className={ styles.menu }>
        <Link to='/'>
         <HiOutlineShoppingCart className={styles.cart} />
        </Link>
        
        {state.user.photoURL 
        ? <img src={state.user.photoURL} alt='avatar' className={styles.login_button} referrerPolicy='no-referrer' /> 
        :<FaUserInjured className={styles.login_button} onClick={()=>setModalShow(true)}/> }
       
        
      </div>
      <ModalRegister 
        show={modalShow}
        onHide={() => setModalShow(false)}
        />
    </div>
  )
}

export default NavBar;