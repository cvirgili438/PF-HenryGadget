const { Router } = require('express');
const { Op } = require("sequelize");
const router = Router();
const stripe= require("stripe")('sk_test_51MG4j9KeVpay6lghLnhDscQlcxyPJhV3CUuQ3fELiDkZc9yAZsRsuJiqcha92gTQA7rXRHOD4HYw7dwig4tT5fUG00bgfUk2gQ');



const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    let suma 
    items.map(e =>{
        suma = suma + e.price
    })
    return suma
    
  };
  
  
router.post("/", async (req, res) => {
    const { items } = req.body;
    console.log(items)  
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });


module.exports=router