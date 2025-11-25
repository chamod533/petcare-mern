import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm({ order }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);

    try {
      // 1) Create PaymentIntent
      const res = await API.post("/payments/create-payment-intent", {
        orderId: order._id,
        amount: Math.round(order.totalPrice * 100),
        currency: "usd",
      });

      const clientSecret = res.data.clientSecret;

      // 2) Confirm card payment
      const cardElement = elements.getElement(CardElement);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: order.shippingAddress?.name || "Customer",
          },
        },
      });

      if (result.error) {
        alert(result.error.message);
        setLoading(false);
        return;
      }

      if (result.paymentIntent?.status === "succeeded") {
        // Mark order paid
        await API.put(`/orders/${order._id}/pay`, {
          id: result.paymentIntent.id,
          status: result.paymentIntent.status,
          update_time: new Date().toISOString(),
          email_address: "",
        });

        alert("Payment successful!");
        localStorage.removeItem("cart");
        navigate("/orders");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-card shadow-sm p-4 rounded-4">
      <h2 className="checkout-title mb-3">Pay ${order.totalPrice.toFixed(2)}</h2>

      <form onSubmit={handleSubmit}>
        <div className="card-element-wrapper mb-3">
          <CardElement />
        </div>

        <button
          type="submit"
          className="btn btn-success w-100 pay-btn"
          disabled={!stripe || loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
}

export default function CheckoutWrapper() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!cart.length) {
      alert("Cart empty");
      return;
    }

    const orderItems = cart.map((i) => ({
      name: i.name,
      qty: i.qty,
      price: i.price,
      product: i._id,
    }));
    const itemsPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const shippingPrice = itemsPrice > 50 ? 0 : 5;
    const taxPrice = +(itemsPrice * 0.1).toFixed(2);
    const totalPrice = +(itemsPrice + shippingPrice + taxPrice).toFixed(2);

    async function createOrder() {
      try {
        const res = await API.post("/orders", {
          orderItems,
          shippingAddress: { address: "N/A" },
          paymentMethod: "card",
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        });
        setOrder(res.data);
      } catch (err) {
        alert("Could not create order");
      }
    }
    createOrder();
  }, []);

  if (!order) return <div className="loading-text">Creating order...</div>;

  return (
    <div className="checkout-page container py-5">
      <Elements stripe={stripePromise}>
        <CheckoutForm order={order} />
      </Elements>
    </div>
  );
}
