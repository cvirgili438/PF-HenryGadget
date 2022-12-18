import React, { useState, useEffect,useRef } from "react";
import { useSelector } from "react-redux";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Box, Button, Skeleton} from "@mui/material";


import styles from './Checkout.module.css'
import CheckoutForm from "./CheckoutForm.jsx";
import Steppers from './Stepper.jsx'

import { getAllCart } from "../../Utils/cart/cartCrud";
import suma from "./controllers/controller.js";
import Purchase from "./Steps/Purchase.jsx";
import Adress from "./Steps/Adress.jsx";
import Payment from "./Steps/Payment.jsx";



// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51MG4j9KeVpay6lghl5aFDksbQDvpIDC8wZESVybDbtRc87wWpUynzmcp4UI5AgNRRzaU7o3VybGtWLQKMd0NBeXC005CZYGKTb");

export default function Checkout() {
  const [active,setActive]=useState(0)
  function verification (num){
    switch(num){
      case 0:
        return (<Purchase />);
      case 1 :
        return (<Adress />);
      case 2 :
        return (<Payment />)
    }
  }

  return (
    <div className={`container ${styles.container}`}>
      <Steppers  active={active}/>
      {verification(active)}
      <Button  
       onClick={e =>setActive(active -1)}
       variant="contained" sx={{
         backgroundColor: 'black',
         color:'white'
       }} disabled={active === 0 ? true : false} 
      >
        Back
      </Button>
      <Button 
      onClick={e =>setActive(active +1)}
      variant="contained" sx={{
        backgroundColor: 'black',
        color:'white'
      }} disabled={active > 1 ? true : false} >{active > 1 ? 'Finish' : 'Next'}</Button>
    
    </div>
  );
}