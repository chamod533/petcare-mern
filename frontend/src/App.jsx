import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import AdminProducts from './pages/AdminProducts';
import AdminEditProduct from './pages/AdminEditProduct';
import AdminOrders from './pages/AdminOrders';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import About from "./pages/About";
import Contact from "./pages/Contact";


export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/product/create" element={<AdminEditProduct />} />
        <Route path="/admin/product/:id/edit" element={<AdminEditProduct />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/products" element={<Products />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

      </Routes>
    </div>
  );
}
