// src/routes/index.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import About from "./pages/AboutMe";
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register";
import Dashboard from "./pages/admin/dashboard";
import Cart from "./pages/transaction/cart";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/about/:name" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element = {<Dashboard />} />
      <Route path = "/transaction/cart" element={<Cart />} />
    </Routes>
  );
};

export default AppRoutes; 
