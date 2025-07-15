// src/routes/index.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import About from "./pages/AboutMe";
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register";
import Dashboard from "./pages/admin/Dashboard";
import Cart from "./pages/shop/Cart";
import Products from "./pages/admin/Products.";
import CreateProduct from "./pages/admin/CreateProduct";
import EditProduct from "./pages/admin/EditProduct";
import ProfileSettings from "./pages/auth/ProfileSettings";
import ProductList from "./pages/shop/ProductList";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/about/:name" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element = {<Dashboard />} />
      <Route path = "/shop/cart" element={<Cart />} />
      <Route path = "/shop/product-list" element={<ProductList />} />
      <Route path = "/admin/products" element={<Products />} />
      <Route path="/admin/products/create" element={<CreateProduct />} />
      <Route path="/admin/products/edit/:id" element={<EditProduct />} />
      <Route path="/profile-settings" element={<ProfileSettings />} />
    </Routes>
  );
};

export default AppRoutes; 
