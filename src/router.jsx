// src/routes/index.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/HelloWorld";
import About from "./pages/AboutMe";
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register";
import Dashboard from "./pages/admin/dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about/:name" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element = {<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes; 
