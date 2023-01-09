import React, { useState, useEffect,useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Box, CircularProgress, Skeleton} from "@mui/material";


import styles from './Payment.module.css'
import CheckoutForm from "../CheckoutForm.jsx";
import Stepper from '../Stepper.jsx'

import { getAllCart } from "../../../Utils/cart/cartCrud.js";
import suma from "../controllers/controller.js";
import { URL } from "../../../Redux/Constants";

import { setOrder } from "../../../Redux/Actions/order";

import Total from "../../CartPage/Total.jsx";

const PAYPAL_CLIENT_ID = 'AUjzPmpSla9_Kmo_fL_sdjJzYQLu0xDBxtsvUvUqo6q41fy_ukWAVjTnT0VgsYAU4QrcvGyn_08rkHdq'

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE);

export default function Payment() {
    const [clientSecret, setClientSecret] = useState("");
    const [stripeHidden, setStripeHidden] = useState(true);
    const [paypalHidden, setPayPalHidden] = useState(true);
    const [paymentStatus, setPaymentStatus] = useState(false);

    const user = useSelector(state =>state.user)
    let total = useRef(0)

    const dispatch = useDispatch();

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
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };


  return(
    <div className={styles.divGlobal}>
      <div className={styles.divTitle}> 
        <h2 className={styles.title}>Select your payment method</h2> 
      </div>
        <hr className={styles.hr1}></hr>
      <div className={styles.divContent}>
        <div className={styles.divPaymentOptions}>
          <div 
            className={styles.divStripe}
            onClick={() => setStripeHidden(!stripeHidden)}
          >
            <div>
              <h3 className={styles.stripeText}>Credit or Debit Card</h3>
            </div>
          </div>
          <div className={stripeHidden ? styles.divHidden : styles.divStripeContent}>
            <div>
              <Box sx={{
                  display:'flex',
                  flexDirection:'row',
                  ml:10,  
                  mr :10,
                  justifyContent:'space-evenly'
              }} >  
                {clientSecret && (
                  <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm />
                  </Elements>
                )}
              </Box>
            </div>
          </div>
          <div 
            className={styles.divPayPal}
            onClick={() => setPayPalHidden(!paypalHidden)}
          >
            <h3 className={styles.paypalText}>PayPal</h3>
          </div>
          <div className={paypalHidden ? styles.divHidden : styles.divPayPalContent}>
            <div className={styles.divPayPalButtons}>
              <PayPalScriptProvider options={{"client-id": PAYPAL_CLIENT_ID}}>
                  <PayPalButtons 
                    createOrder={(data, actions) => {
                      return actions.order
                          .create({
                              purchase_units: [
                                  {
                                      amount: {
                                          currency_code: 'USD',
                                          value: total.current,
                                      },
                                  },
                              ],
                          })
                          .then((orderId) => {
                              // Your code here after create the order
                              return orderId;
                          })
                          .catch(err => console.log(err))
                    }}
                    onApprove={async function(data, actions) {
                      dispatch(setOrder(user.uid))
                      return await actions.order.capture()

                    }}
                  />
              </PayPalScriptProvider>
            </div>
          </div>
        </div>

        <div className={styles.divTotal}>
          <Total/>
        </div>
      </div>
    </div>
  )
}