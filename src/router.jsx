// src/routes/index.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/HelloWorld";
import About from "./pages/AboutMe";
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about/:name" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes; 
