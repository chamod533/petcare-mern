import React, { useEffect, useState } from 'react';
import API from '../api/api';
import ProductCard from '../components/ProductCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (

    <>
  {/* 🔥 Hero Section */}
  <div className="hero-section d-flex align-items-center">
    <div className="container text-center"></div>
  </div>

  

  {/* 🔥 Product List Section */}
  <div className="container home-container py-4">
    <h2 className="text-center mb-4 home-title">Our Products</h2>

    <div className="row g-4">
      {products.map((p) => (
        <div key={p._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  </div>

  {/* 🔥 FOOTER SECTION */}
  <footer className="footer-section text-light mt-5">
    <div className="container py-4">
      <div className="row">

        {/* Brand */}
        <div className="col-md-4 mb-3">
          <h4 className="footer-brand">🐾 PetCare Shop</h4>
          <p>Your trusted partner for all pet essentials.</p>

          <div className="footer-socials">
            <i className="bi bi-facebook"></i>
            <i className="bi bi-instagram"></i>
            <i className="bi bi-twitter"></i>
            <i className="bi bi-youtube"></i>
          </div>
        </div>

        {/* Quick Links */}
        <div className="col-md-4 mb-3">
          <h5>Quick Links</h5>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/cart">Cart</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="col-md-4 mb-3">
          <h5>Contact Us</h5>
          <p>Email: support@petcare.com</p>
          <p>Phone: +94 71 234 5678</p>
          <p>Address: Colombo, Sri Lanka</p>
        </div>

      </div>

      <div className="text-center pt-3 mt-3 border-top border-secondary">
        <p className="mb-0">© {new Date().getFullYear()} PetCare Shop. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</>
 

    
  );
}
