import React, { useEffect, useState } from 'react';
import API from '../api/api';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await API.get('/orders'); // Admin route
      setOrders(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Error loading orders');
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await API.put(`/orders/${id}/deliver`, { 
        status: newStatus,
        isDelivered: newStatus === 'Delivered'
      });
      load();
    } catch (err) {
      alert('Update failed');
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm('Delete order?')) return;
    try {
      await API.delete(`/orders/${id}`);
      load();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 fw-bold">Admin — Orders</h2>

      <table className="table table-bordered table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
            <th>Created</th>
            <th style={{ width: "260px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(o => (
            <tr key={o._id}>
              <td>{o._id}</td>
              <td>
                {o.user?.name} <br />
                <small className="text-muted">{o.user?.email}</small>
              </td>
              <td>${o.totalPrice?.toFixed(2)}</td>
              <td>
                {o.status}{" "}
                {o.isDelivered && (
                  <span className="badge bg-success ms-1">Delivered</span>
                )}
              </td>
              <td>{new Date(o.createdAt).toLocaleString()}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => updateStatus(o._id, 'Shipped')}
                >
                  Mark Shipped
                </button>

                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => updateStatus(o._id, 'Delivered')}
                >
                  Mark Delivered
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteOrder(o._id)}
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
