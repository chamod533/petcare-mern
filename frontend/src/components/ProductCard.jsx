import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductCard.css';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card card shadow-sm rounded-4 border-0">
      
      {/* Product Image */}
      <div className="product-img-wrapper">
        <img
          src={product.image || 'https://via.placeholder.com/250'}
          alt={product.name}
          className="card-img-top product-img"
        />
      </div>

      {/* Card Body */}
      <div className="card-body text-center">

        <h5 className="card-title fw-bold product-name">
          {product.name}
        </h5>

        <p className="product-price mb-1">
          ${product.price.toFixed(2)}
        </p>

        {product.category && (
          <span className="badge bg-primary mb-2 category-badge">
            {product.category}
          </span>
        )}

        {/* Rating Section */}
        {product.rating !== undefined && product.numReviews !== undefined && (
          <p className="product-rating mb-2">
            {'⭐'.repeat(Math.round(product.rating))} ({product.numReviews} reviews)
          </p>
        )}

        <div className="d-flex justify-content-center gap-2">
          <Link 
            to={`/product/${product._id}`} 
            className="btn btn-outline-primary btn-sm rounded-pill px-4"
          >
            View
          </Link>

          <button
            onClick={() => onAddToCart(product._id)}
            className="btn btn-primary btn-sm rounded-pill px-4"
          >
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
}
