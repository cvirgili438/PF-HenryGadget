const { Router } = require('express');
const { Op } = require("sequelize");
const router = Router();
const API_KEY = process.env.API_KEY
const stripe= require("stripe")(API_KEY);

router.post("/", async (req, res) => {
    const {items} = req.body
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