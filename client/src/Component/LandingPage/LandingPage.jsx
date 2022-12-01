import React from 'react';
import { Link } from 'react-router-dom';

import NavBar from '../NavBar/NavBar';
import Products from '../Products/Products';
import Footer from '../Footer/Footer';

import styles from './LandingPage.module.css';


const LandingPage = () => {

  return (
    <div className={ styles.container }>   
      <div className={ styles.header }>
        <NavBar />
      </div>
      <div className={ styles.main }>
        <h1>Bienvenidos xD</h1>
        <Link to= '/home'>
            <button>Inicio</button>
        </Link>
        <Products />
      </div>
      <div className={ styles.footer }>
        <Footer />
      </div>         
    </div>
  )
}

export default LandingPage;