import React, { useState, useEffect } from 'react';
import CartItem from '../components/CartItem';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, []);

  const removeFromCart = (id) => {
    const newCart = cart.filter(i => i._id !== id);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="container py-5">
      <h1 className="mb-4 fw-bold">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center p-5 bg-light rounded shadow-sm">
          <h4>Your cart is empty 😢</h4>
          <p>Add some products to continue shopping.</p>
          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate("/products")}
          >
            Browse Products
          </button>
        </div>
      ) : (
        <>
          <div className="row">
            <div className="col-lg-8">
              {cart.map(item => (
                <CartItem
                  key={item._id}
                  item={item}
                  removeFromCart={removeFromCart}
                />
              ))}
            </div>

            {/* Summary Card */}
            <div className="col-lg-4">
              <div className="card shadow-sm p-4">
                <h4 className="fw-bold mb-3">Order Summary</h4>

                <div className="d-flex justify-content-between mb-2">
                  <span>Total Items:</span>
                  <span>{cart.length}</span>
                </div>

                <div className="d-flex justify-content-between fs-5 fw-bold border-top pt-3">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                {/* Updated Checkout Button */}
                <button
                  className="btn btn-success w-100 mt-4"
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
