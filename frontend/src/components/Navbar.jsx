import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar shadow-sm">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/">
          🐾 PetCare Shop
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">

            {/* Navigation links */}
            <li className="nav-item me-3">
              <Link className="nav-link" to="/products">Products</Link>
            </li>
            <li className="nav-item me-3">
              <Link className="nav-link" to="/cart">Cart</Link>
            </li>
            <li className="nav-item me-3">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item me-3">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>

            {user ? (
              <>
                {/* Admin Link - only visible for admins */}
                {user?.isAdmin && (
                  <li className="nav-item me-3">
                    <Link className="nav-link text-warning fw-bold" to="/admin/products">
                      Admin
                    </Link>
                  </li>
                )}

                <li className="nav-item me-3">
                  <span className="nav-user">Hi, {user.name}</span>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger btn-sm px-3"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item me-3">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>

                <li className="nav-item">
                  <Link className="btn btn-primary btn-sm px-3" to="/register">Register</Link>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}
