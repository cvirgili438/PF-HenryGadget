import React,{useEffect} from "react";
import shopping from "../../Assets/shopping.png";
import styles from "./OurServices.module.css";
import PaymentIcon from '@mui/icons-material/Payment';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import SellIcon from '@mui/icons-material/Sell';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
// import Aos from 'aos'
import 'aos/dist/aos.css'

function OurServices() {

  

  return (
    <div className={styles.container_info}>

      <div className={styles.container_info_sub1}>
        <div className={styles.title_container} data-aos='flip-up' data-aos-offset='-400' data-aos-duration='1300' data-aos-once='true'>
          <h1>Our services</h1>
        </div>

        <div className={styles.services_container} data-aos='fade-right' data-aos-offset='-400' data-aos-duration='1300' data-aos-delay='100' data-aos-once='true' >
            <div className={styles.services}>
                <ShoppingCartCheckoutIcon className={styles.services_icon}/>
                <p>Online shopping</p>
            </div>
            <CheckCircleOutlinedIcon style={{width:'3rem',height:'3em'}} />
        </div>
        
        <div className={styles.services_container} data-aos='fade-right' data-aos-offset='-450' data-aos-duration='1300' data-aos-delay="400" data-aos-once='true'>
         <div className={styles.services}>
          <SellIcon className={styles.services_icon}/>
          <p>Best prices</p>
         </div>
         <CheckCircleOutlinedIcon style={{width:'3rem',height:'3em'}} />
        </div>
       
        <div className={styles.services_container} data-aos='fade-right' data-aos-offset='-550' data-aos-duration='1300' data-aos-delay="800" data-aos-once='true'>
            <div className={styles.services}>
                <LocalShippingIcon className={styles.services_icon}/>
                <p>Free shipping</p>
            </div>
             <CheckCircleOutlinedIcon style={{width:'3rem',height:'3em'}} />      
        </div>

        <div className={styles.services_container} data-aos='fade-right' data-aos-offset='-650' data-aos-duration='1300' data-aos-delay="1200" data-aos-once='true'>
            <div className={styles.services}>
                <ElectricBoltIcon className={styles.services_icon}/>
                <p>Fast deliver</p>
            </div>
             <CheckCircleOutlinedIcon style={{width:'3rem',height:'3em'}} />
        </div>
        <div className={styles.services_container} data-aos='fade-right' data-aos-offset='-750' data-aos-duration='1300' data-aos-delay="1600" data-aos-once='true'>
            <div className={styles.services}>
                <PaymentIcon className={styles.services_icon}/>
                <p>All payments</p>
            </div>
             <CheckCircleOutlinedIcon style={{width:'3rem',height:'3em'}} />
        </div>

        <div className={styles.services_container} data-aos='fade-right' data-aos-offset='-850' data-aos-duration='1300' data-aos-delay="2000" data-aos-once='true'>
            <div className={styles.services}>
                <SupportAgentOutlinedIcon className={styles.services_icon}/>
                <p>Personalized attention</p>
            </div>
             <CheckCircleOutlinedIcon style={{width:'3rem',height:'3em'}} />
        </div>


      </div>

      <div className={styles.container_info_sub2} data-aos='fade-left' data-aos-offset='-800' data-aos-duration='3000' data-aos-delay="650" data-aos-once='true'>
        <img src={shopping} alt="probando"  />
      </div>
    </div>
  );
}

export default OurServices;
