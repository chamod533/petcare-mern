import React from "react";
import { motion } from "framer-motion";
import "./CartItem.css";

export default function CartItem({ item, removeFromCart }) {
  return (
    <motion.div
      className="cart-card"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="cart-body">

        {/* Product image */}
        <img
          src={item.image}
          alt={item.name}
          className="cart-img"
        />

        {/* Product details */}
        <div className="cart-info">
          <h6 className="cart-title">{item.name}</h6>
          <span className="cart-qty">Quantity: {item.qty}</span>
        </div>

        {/* Price + Remove */}
        <div className="cart-right">
          <h6 className="cart-price">${(item.price * item.qty).toFixed(2)}</h6>

          <button
            className="btn btn-danger btn-sm remove-btn"
            onClick={() => removeFromCart(item._id)}
          >
            Remove
          </button>
        </div>

      </div>
    </motion.div>
  );
}
