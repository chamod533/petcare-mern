const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
require('dotenv').config();

const stripe = Stripe(process.env.STRIPE_SECRET); // Make sure your .env has STRIPE_SECRET_KEY

router.post('/create-payment', async (req, res) => {
  try {
    const { amount } = req.body;

    // Stripe expects amount in cents (e.g., $10 = 1000)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, 
      currency: 'usd',
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment Failed", error: error.message });
  }
});

module.exports = router;
