const { Router } = require('express');
const { Op } = require("sequelize");
const router = Router();
const stripe= require("stripe")('sk_test_51MG4j9KeVpay6lghLnhDscQlcxyPJhV3CUuQ3fELiDkZc9yAZsRsuJiqcha92gTQA7rXRHOD4HYw7dwig4tT5fUG00bgfUk2gQ');


  
router.post("/", async (req, res) => {
    const {items} = req.body
    console.log(items)
    // let nuevoArray = items.map(e => e.price*e.quantity)
    // let sum = 0
    // for(let i = 0; i< nuevoArray.length;i++){
    //     sum = sum+nuevoArray[i]
    // }
    
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: items,
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