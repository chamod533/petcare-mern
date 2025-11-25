import React, { useState, useEffect } from "react";
import API from "../api/api";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: 0,
    category: "",
    image: "",
    description: "",
    countInStock: 0,
  });

  useEffect(() => {
    if (id && id !== "create") {
      API.get(`/products/${id}`)
        .then((res) => setForm(res.data))
        .catch(() => alert("Failed to load product"));
    }
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (id === "create") {
        await API.post("/products", form);
      } else {
        await API.put(`/products/${id}`, form);
      }
      navigate("/admin/products");
    } catch (err) {
      alert(err.response?.data?.message || "Save failed");
    }
  };

  return (
    <div className="container mt-4">

      <div className="card shadow p-4 rounded-4" style={{ background: "#FFF8D6" }}>
        <h2 className="fw-bold text-warning mb-3">
          {id === "create" ? "Create Product" : "Edit Product"}
        </h2>

        <form onSubmit={submit} className="row g-3">

          <div className="col-md-6">
            <label className="form-label fw-bold">Product Name</label>
            <input
              className="form-control rounded-3"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter product name"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">Price ($)</label>
            <input
              className="form-control rounded-3"
              type="number"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: Number(e.target.value) })
              }
              placeholder="Enter price"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">Category</label>
            <input
              className="form-control rounded-3"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
              placeholder="Enter category"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">Image URL</label>
            <input
              className="form-control rounded-3"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="https://example.com/product.jpg"
            />
          </div>

          <div className="col-12">
            <label className="form-label fw-bold">Description</label>
            <textarea
              className="form-control rounded-3"
              rows="3"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Enter product description"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">Count in Stock</label>
            <input
              className="form-control rounded-3"
              type="number"
              value={form.countInStock}
              onChange={(e) =>
                setForm({ ...form, countInStock: Number(e.target.value) })
              }
              placeholder="Quantity available"
            />
          </div>

          <div className="col-12 text-center">
            <button
              type="submit"
              className="btn btn-warning fw-bold px-5 py-2 rounded-pill"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
