import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

import { getProductsByQuery } from '../../Redux/Action/index.js'

import Button from '../Button/Button.jsx';
import Input from "../Input/Input.jsx";

import logo from '../../Assets/logo.png'

import styles from './NavBar.module.css';
import ModalRegister from "../ModalRegister/ModalRegister.jsx";

const NavBar = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const handleInputChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(getProductsByQuery({name: input}));
  };

  const handleClear = e => {
    e.preventDefault();
    setInput('');
  };

  return (
    <div className={ styles.container }>
      <img src={logo} alt='logo' className={ styles.logo }/>
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