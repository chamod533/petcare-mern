import React, { useState, useEffect } from "react";
import API from "../api/api";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    API.get("/products").then((res) => setProducts(res.data));
  }, []);

  const addProduct = async () => {
    try {
      const res = await API.post("/products", {
        name,
        price,
        category,
        image,
        description: desc,
      });

      setProducts([...products, res.data]);
      setName("");
      setPrice("");
      setCategory("");
      setImage("");
      setDesc("");
    } catch (err) {
      alert("Error adding product");
    }
  };

  return (
    <div className="container mt-4">

      <h1 className="text-center mb-4 fw-bold">Admin Dashboard</h1>

      <div className="card p-4 shadow rounded-4" style={{ background: "#fff8d6" }}>
        <h3 className="fw-bold text-warning mb-3">Add Product</h3>

        <div className="row g-3">

          <div className="col-md-6">
            <input
              className="form-control rounded-3"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <input
              className="form-control rounded-3"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <input
              className="form-control rounded-3"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <input
              className="form-control rounded-3"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <div className="col-12">
            <textarea
              className="form-control rounded-3"
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>

          <div className="col-12 text-center">
            <button
              onClick={addProduct}
              className="btn btn-warning px-5 py-2 fw-bold rounded-pill"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>

      <h3 className="fw-bold mt-4">All Products</h3>

      <ul className="list-group mt-3 shadow-sm">
        {products.map((p) => (
          <li
            key={p._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{p.name}</span>
            <span className="fw-bold text-success">${p.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
