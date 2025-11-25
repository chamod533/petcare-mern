import React, { useEffect, useState } from "react";
import API from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Error loading products");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await API.delete(`/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="fw-bold text-warning">Admin - Products</h1>

        <button
          className="btn btn-warning fw-bold rounded-pill px-4"
          onClick={() => navigate("/admin/product/create")}
        >
          + Create New Product
        </button>
      </div>

      <div className="card shadow rounded-4" style={{ background: "#FFF8D6" }}>
        <div className="card-body">

          <table className="table table-hover align-middle">
            <thead>
              <tr className="table-warning text-dark fw-bold">
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th style={{ width: "180px" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td className="fw-semibold">{p.name}</td>
                  <td>${p.price}</td>
                  <td>{p.category}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary rounded-pill me-2"
                      onClick={() => navigate(`/admin/product/${p._id}/edit`)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-sm btn-danger rounded-pill"
                      onClick={() => handleDelete(p._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>
    </div>
  );
}
