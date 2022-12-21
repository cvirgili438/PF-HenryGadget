import React, { useState, useEffect,useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {  Button } from "@mui/material";
import styles from './Checkout.module.css'
import Steppers from './Stepper.jsx'
import Purchase from "./Steps/Purchase.jsx";
import Adress from "./Steps/Adress.jsx";
import Payment from "./Steps/Payment.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setAddress } from "../../Redux/Actions/checkout";



// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const API_KEY = process.env.API_KEY
const stripePromise = loadStripe(API_KEY);

export default function Checkout() {
  const [active,setActive]=useState(0)
  const user = useSelector(state => state.user)
  const address = useSelector(state=>state.adress)
  const dispatch = useDispatch()
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
  function handleButton (e){
    e.preventDefault();
    if(active === 1 ){
      dispatch(setAddress({idUser:user.uid,address:address}))
      return setActive(active+1)
    }
    return setActive(active+1)
    
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
      <Button id="stepper-button"
      onClick={e =>handleButton(e)}
      variant="contained" sx={{
        backgroundColor: 'black',
        color:'white'
      }} disabled={active > 1 ? true : false} >{active > 1 ? 'Finish' : 'Next'}</Button>
    
    </div>
  );
}