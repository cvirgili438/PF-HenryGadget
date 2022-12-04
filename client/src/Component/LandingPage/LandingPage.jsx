import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import { getProductsByQuery } from '../../Redux/Action';

// import { Link } from 'react-router-dom';
import Products from '../Products/Products';
import Footer from '../Footer/Footer';


import styles from './LandingPage.module.css';


const LandingPage = () => {
  // const featured = useSelector(state => state.featured); // para cuando haya productos destacados
  
  return (
    <div className={ styles.container }>   
      <div className={ styles.main }>
        {/* {
          featured.length > 0 ?
          <>
            <h1>Featured products</h1>
            <Products featured={true} />
          </>
          :
          <> */}
            <Products />
          {/* </>
        } */}
        <div className={ styles.footer }>
          <Footer />
        </div>
      </div>         
    </div>
  )
}

export default LandingPage;