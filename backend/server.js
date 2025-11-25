require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');
const contactRoutes = require('./routes/contactRoutes');


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('./models/Order');

const app = express();

// IMPORTANT: Skip JSON parsing for /webhook
app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next(); // skip express.json() for webhook
  } else {
    express.json()(req, res, next);
  }
});

app.use(cors());

// API routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoutes);


// =====================
// Stripe Webhook Route
// =====================
app.post(
  '/webhook',
  bodyParser.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      console.log('Webhook verified:', event.type);
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // ⭐ Handle successful payments
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      const orderId = paymentIntent.metadata?.orderId;

      try {
        if (orderId) {
          const order = await Order.findById(orderId);

          if (order && !order.isPaid) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.status = 'Paid';

            order.paymentResult = {
              id: paymentIntent.id,
              status: paymentIntent.status,
              email_address: paymentIntent.receipt_email || ''
            };

            await order.save();
            console.log(`Order ${orderId} marked as PAID by webhook`);
          }
        }
      } catch (err) {
        console.error('Order update from webhook failed:', err.message);
      }
    }

    res.json({ received: true });
  }
);

// PORT + DB
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Mongo connected');
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch((err) => console.error(err));
