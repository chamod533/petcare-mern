// backend/routes/payments.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { verifyToken } = require('../middleware/authMiddleware');

// Create a payment intent for an order
// POST /api/payments/create-payment-intent
// body: { orderId, amount }  // amount in cents on backend or computed from order
router.post('/create-payment-intent', verifyToken, async (req, res) => {
  try {
    const { orderId, amount, currency = 'usd' } = req.body;
    if (!amount) return res.status(400).json({ message: 'Amount required' });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // expect cents
      currency,
      metadata: { orderId: orderId || '' }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Create PI error', err);
    res.status(500).json({ message: 'PaymentIntent creation failed', error: err.message });
  }
});

module.exports = router;
