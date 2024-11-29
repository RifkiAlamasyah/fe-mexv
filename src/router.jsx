// src/routes/index.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import HelloWorld from "./pages/HelloWorld";
import AboutMe from "./pages/AboutMe";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HelloWorld />} />
      <Route path="/about-me/:name" element={<AboutMe />} />
    </Routes>
  );
};

export default AppRoutes;
