import React, { useState, useEffect,useRef } from "react";
import { useSelector } from "react-redux";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Box, CircularProgress, Skeleton} from "@mui/material";


import styles from '../Checkout.module.css'
import CheckoutForm from "../CheckoutForm.jsx";
import Stepper from '../Stepper.jsx'

import { getAllCart } from "../../../Utils/cart/cartCrud.js";
import suma from "../controllers/controller.js";
import { URL } from "../../../Redux/Constants";



// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const API_KEY = process.env.REACT_APP_API_KEY;
const stripePromise = loadStripe(API_KEY);

export default function Payment() {
    const [clientSecret, setClientSecret] = useState("");
    const user = useSelector(state =>state.user)
    let total = useRef(0)

useEffect(async () => {
    // Create PaymentIntent as soon as the page loads
    if(user.uid){
      const items = await getAllCart(user.uid)
      console.log(items)
      total.current=suma(items)
    
    
      fetch(URL+"/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: suma(items)}),
      })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
    }
    
  }, []);

  const appearance = {
    theme: 'night',
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div className={`container ${styles.container}`}>

    <Box sx={{
        display:'flex',
        flexDirection:'row',
        ml:10,
        mr :10,
        justifyContent:'space-evenly'
    }} >
        <Box>
        
        {total.current === 0 ? <CircularProgress /> : <h3>total price to pay is  {total.current}U$D</h3>}
        </Box>
        
  {clientSecret && (
    <Elements options={options} stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  )}
  </Box>
</div>
  )}