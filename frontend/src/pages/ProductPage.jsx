import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import "./ProductPage.css";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  // Review State
  const [ratingValue, setRatingValue] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((i) => i._id === product._id);

    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ ...product, qty });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
    navigate("/cart");
  };

  const submitReview = async () => {
    try {
      await API.post(
        `/products/${id}/review`,
        {
          rating: Number(ratingValue),
          comment: reviewText,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      alert("Review submitted!");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Error submitting review");
    }
  };

  if (!product)
    return <div className="loading-text">Loading product details...</div>;

  return (
    <div className="product-page container">
      <div className="product-card shadow-sm p-4 rounded-4 d-flex flex-wrap align-items-start gap-4">
        
        {/* Product Image */}
        <div className="product-image-box">
          <img
            src={product.image || "https://via.placeholder.com/300"}
            alt={product.name}
            className="product-image"
          />
        </div>

        {/* Product Details */}
        <div className="product-details flex-grow-1">
          <h2 className="product-title">{product.name}</h2>

          {/* Rating */}
          {product.numReviews > 0 && (
            <p>
              ⭐ {product.rating.toFixed(1)} ({product.numReviews} reviews)
            </p>
          )}

          <p className="product-description">{product.description}</p>
          <p className="product-price fw-bold">${product.price}</p>
          <p className="product-stock">
            {product.countInStock > 0
              ? `In Stock: ${product.countInStock}`
              : "Out of Stock"}
          </p>

          {/* Quantity + Add Button */}
          <div className="d-flex align-items-center gap-3 mt-3">
            <input
              type="number"
              min="1"
              max={product.countInStock}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="form-control qty-input"
            />
            <button
              className="btn btn-success btn-lg add-cart-btn"
              onClick={addToCart}
              disabled={product.countInStock === 0}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-5">
        <h3>Customer Reviews</h3>

        {/* Existing Reviews */}
        {product.reviews?.length === 0 && <p>No reviews yet</p>}

        {product.reviews?.map((rev) => (
          <div key={rev._id} className="border rounded p-2 mb-2 bg-light">
            <strong>{rev.name}</strong> – ⭐ {rev.rating}
            <p className="m-0">{rev.comment}</p>
          </div>
        ))}

        {/* Submit Review */}
        {user ? (
          <div className="mt-4">
            <h4>Write a Review</h4>

            <label className="mt-2">Rating:</label>
            <select
              value={ratingValue}
              onChange={(e) => setRatingValue(e.target.value)}
              className="form-select"
            >
              <option value="5">⭐⭐⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="2">⭐⭐</option>
              <option value="1">⭐</option>
            </select>

            <textarea
              rows="3"
              placeholder="Write your review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="form-control mt-3"
            />

            <button onClick={submitReview} className="btn btn-primary mt-3">
              Submit Review
            </button>
          </div>
        ) : (
          <p className="mt-3">
            <i>You must log in to write a review.</i>
          </p>
        )}
      </div>
    </div>
  );
}
