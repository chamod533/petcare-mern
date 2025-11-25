import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="container py-5">
      <div className="about-container">
        <h2 className="about-title">About Our Store</h2>

        <p className="about-text mt-3">
          Welcome to our online marketplace. We provide the best products in
          technology, fashion, electronics, and home essentials at affordable prices.
        </p>

        <p className="about-text">
          Our mission is to give customers the best buying experience with secure
          checkout, fast delivery, and great service.
        </p>

        <h4 className="about-subtitle">Why choose us?</h4>

        <ul className="about-list">
          <li>Quality Products</li>
          <li>Secure Shopping</li>
          <li>Fast Delivery</li>
          <li>24/7 Customer Support</li>
        </ul>
      </div>
    </div>
  );
}
