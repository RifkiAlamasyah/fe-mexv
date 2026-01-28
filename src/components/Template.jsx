import React from "react";
import Navbar from "./molecules/Navbar";
import Footer from "./molecules/Footer";
import BottomNav from "./molecules/BottomNav";
import CartFloating from "./molecules/CartFloating"; // <--- import cart floating

const Template = ({ children }) => {
  return (
    <div className="min-h-screen relative">
      <Navbar />

      {/* padding atas buat navbar, bawah buat bottom tab */}
      <main className="pt-[50px] pb-16">{children}</main>

      <Footer />
      <BottomNav />

      {/* Floating Cart */}
      <CartFloating /> 
    </div>
  );
};

export default Template;
