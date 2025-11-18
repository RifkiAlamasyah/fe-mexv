// src/routes/index.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import About from "./pages/AboutMe";
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register";
import Dashboard from "./pages/admin/Dashboard";
import Cart from "./pages/shop/Cart";
import Products from "./pages/admin/products/Products.";
import CreateProduct from "./pages/admin/products/CreateProduct";
import EditProduct from "./pages/admin/products/EditProduct";
import ProfileSettings from "./pages/auth/ProfileSettings";
import ProductList from "./pages/shop/ProductList";
import ListProductImg from "./pages/admin/media-product/ListProductImg";


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
      <Route path="/admin/img-product/list" element={<ListProductImg />} />
    </Routes>
  );
};

export default AppRoutes; 
