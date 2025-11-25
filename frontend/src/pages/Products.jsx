import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Products.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/products", {
        params: { search, category, minPrice, maxPrice }
      });
      setProducts(res.data);
    } catch (err) {
      Swal.fire("Error", "Failed to load products", "error");
    }
    setLoading(false);
  };

  // AUTO FILTER for search + category
  useEffect(() => {
    const delay = setTimeout(() => loadProducts(), 400);
    return () => clearTimeout(delay);
  }, [search, category]);

  useEffect(() => {
    loadProducts();
  }, []);

  const resetFilters = () => {
    setSearch("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    loadProducts();
  };

  return (
    <div className="container mt-4 products-page">
      <h2 className="mb-4 fw-bold text-center title-big">🐾 PetCare Products</h2>

      {/* Filter Panel */}
      <div className="filter-box shadow-sm mb-4 p-3 rounded-4">

        <div className="d-flex flex-wrap gap-3">

          <input
            className="form-control filter-input"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="form-select filter-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Food">Food</option>
            <option value="Toys">Toys</option>
            <option value="Belts">Belts</option>
            <option value="Medicine">Medicine</option>
            <option value="Grooming">Grooming</option>
            <option value="Accessories">Accessories</option>
          </select>

          <input
            className="form-control filter-input"
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />

          <input
            className="form-control filter-input"
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />

          <button className="btn btn-primary px-4" onClick={loadProducts}>
            Apply
          </button>

          <button className="btn btn-secondary px-4" onClick={resetFilters}>
            Reset
          </button>

        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="row">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="col-md-4 mb-4">
              <div className="skeleton-card"></div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && products.length === 0 && (
        <div className="text-center mt-5">
          <img
            src="https://i.imgur.com/qIufhof.png"
            alt="empty"
            width="180"
            className="mb-3"
          />
          <h5>No products found</h5>
        </div>
      )}

      {/* Product List */}
      {!loading && products.length > 0 && (
        <div className="row">
          {products.map(p => (
            <div key={p._id} className="col-md-4 mb-4">

              <motion.div
                className="card h-100 shadow product-card"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="card-img-top product-img"
                />

                <div className="card-body">
                  <h5 className="card-title">
                    <Link className="product-link" to={`/product/${p._id}`}>
                      {p.name}
                    </Link>
                  </h5>

                  <p className="card-text text-muted mb-1">
                    Category: {p.category}
                  </p>

                  <p className="card-text fw-bold price-text">
                    ${p.price}
                  </p>
                </div>
              </motion.div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
