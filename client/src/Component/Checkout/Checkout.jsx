import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import styles from './Checkout.module.css'
import CheckoutForm from "./CheckoutForm.jsx";
import { useSelector } from "react-redux";
import { getAllCart } from "../../Utils/cart/cartCrud";
import suma from "./controllers/controller.js";


// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51MG4j9KeVpay6lghl5aFDksbQDvpIDC8wZESVybDbtRc87wWpUynzmcp4UI5AgNRRzaU7o3VybGtWLQKMd0NBeXC005CZYGKTb");

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const user = useSelector(state =>state.user)
    
  useEffect(async () => {
    // Create PaymentIntent as soon as the page loads
    let items = await getAllCart()
    console.log(items)
    
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
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}