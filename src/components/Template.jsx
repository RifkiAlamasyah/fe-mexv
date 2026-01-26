import React from "react";
import Navbar from "./molecules/Navbar";
import Footer from "./molecules/Footer";
import BottomNav from "./molecules/BottomNav";

const Template = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* padding atas buat navbar, bawah buat bottom tab */}
      <main className="pt-[50px] pb-16">
        {children}
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default Template;
