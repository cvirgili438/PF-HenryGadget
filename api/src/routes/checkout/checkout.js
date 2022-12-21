const { Router } = require('express');
const { Op } = require("sequelize");
const router = Router();
const API_KEY = process.env.API_KEY
const stripe= require("stripe")(API_KEY);


  
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