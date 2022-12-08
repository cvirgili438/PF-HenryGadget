import React from 'react';

import Products from '../Products/Products';
import Footer from '../Footer/Footer';
import Slider from '../Slider/Slider';

import styles from './LandingPage.module.css';


const LandingPage = () => {
  // const featured = useSelector(state => state.featured); // para cuando haya productos destacados
  
  return (
    <div className={ styles.container }>   
      <Slider/>

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