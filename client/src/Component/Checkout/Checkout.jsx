import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import styles from './Checkout.module.css'
import CheckoutForm from "./CheckoutForm.jsx";
import { useSelector } from "react-redux";
import { getAllCart } from "../../Utils/cart/cartCrud";
import suma from "./controllers/controller.js";
import { Box, Skeleton } from "@mui/material";
import { useRef } from "react";


// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51MG4j9KeVpay6lghl5aFDksbQDvpIDC8wZESVybDbtRc87wWpUynzmcp4UI5AgNRRzaU7o3VybGtWLQKMd0NBeXC005CZYGKTb");

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const user = useSelector(state =>state.user)
  let total = useRef(0)
  useEffect(async () => {
    // Create PaymentIntent as soon as the page loads
    const items = await getAllCart()
    console.log(items)
    total.current=suma(items)
    
    
    fetch("http://localhost:3001/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: suma(items)}),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
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
                <h3>total price to pay is  {total.current}</h3>
            </Box>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
      </Box>
    </div>
  );
}