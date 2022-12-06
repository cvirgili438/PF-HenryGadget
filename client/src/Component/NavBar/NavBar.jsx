import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from "react-router-dom";

import { getProductsByQuery } from '../../Redux/Action/index.js'

import Button from '../Button/Button.jsx';
import Input from "../Input/Input.jsx";

import logo from '../../Assets/logo.png'

import styles from './NavBar.module.css';
import ModalRegister from "../ModalRegister/ModalRegister.jsx";
import { useEffect } from "react";

const NavBar = () => {
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
    dispatch(getProductsByQuery(search))
    // if (pathname === '/Create/Product'){
    //   setCrud({create:true})
    //   return
    // }
    // else {
    //   setCrud({create:false})
    // }
  },[dispatch,pathname,search,crud]) 


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

      <Link to='/Create/Product' >
          <Button text='Create Product'  />
      </Link>
      
      </div>
      <div className={ styles.menu }>
        <Link to='/'>
          <Button text='Cart' />
        </Link>
        
        <Button text='Login' onClick={()=>setModalShow(true)} />
        <ModalRegister 
        show={modalShow}
        onHide={() => setModalShow(false)}
        />
      </div>
    </div>
  )
}

export default NavBar;