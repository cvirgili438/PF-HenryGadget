import React, { useEffect } from 'react';
import Products from '../Products/Products';
import Slider from '../Slider/Slider';
import styles from './LandingPage.module.css';
import Aos from 'aos'
import 'aos/dist/aos.css'
import OurServices from '../OurServices/OurServices';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';



const LandingPage = () => {
  // const featured = useSelector(state => state.featured); // para cuando haya productos destacados
  useEffect(()=>{
    Aos.init({
    })
  },[])

  return (
    <section className={ styles.container }>   
      <Slider/> 

      <section className={ styles.main }>
       <Products />
      </section>  

      <FeaturedProducts />

      <section>
        <OurServices/>
      </section>

    </section>
  )
}

export default LandingPage;