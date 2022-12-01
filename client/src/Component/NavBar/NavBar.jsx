import React from "react";
import { Link } from "react-router-dom";

import Button from '../Button/Button.jsx';
import Input from "../Input/Input.jsx";

import logo from '../../Assets/logo.png'

import styles from './NavBar.module.css';

const NavBar = () => {

  return (
    <div className={ styles.container }>
      <img src={logo} alt='logo' className={ styles.logo }/>
      <div className={ styles.center }>
        <Input />
        <Link to='/'>
          <Button text='Search' />
        </Link>
      </div>
      <div className={ styles.menu }>
        <Link to='/'>
          <Button text='Cart' />
        </Link>
        <Link to='/user'>
          <Button text='Login' />
        </Link>
      </div>
    </div>
  )
}

export default NavBar;