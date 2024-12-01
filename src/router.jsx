// src/routes/index.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/HelloWorld";
import About from "./pages/AboutMe";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default AppRoutes;
