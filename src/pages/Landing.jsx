import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Template from "../components/Template";

const Landing = () => {
  const products = [
    {
      name: "Hoodie",
      description: "Premium quality hoodie with modern minimalist design",
      image: "./img/banner/hoodie.jpg"
    },
    {
      name: "Crewneck",
      description: "Comfortable everyday wear with clean aesthetics",
      image: "./img/banner/crewneck.jpg",
    },
    {
      name: "Coach Jacket",
      description: "Lightweight jacket perfect for any season",
      image: "./img/banner/coach_jacket.jpeg",
    },
    {
      name: "T-Shirt",
      description: "Soft cotton t-shirt with timeless style",
      image: "./img/banner/tshirt.jpg"
    },
  ];

  return (
    <Template>
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 text-white">
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Elevate Your Everyday Style
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto mb-10 opacity-90">
            Discover modern apparel designed for comfort, quality, and confidence.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/products"
              className="px-8 py-3 rounded-full bg-white text-blue-600 font-semibold hover:bg-gray-100 transition"
            >
              Explore Collection
            </Link>
            <Link
              to="/register"
              className="px-8 py-3 rounded-full border border-white text-white hover:bg-white hover:text-blue-600 transition"
            >
              Join Now
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Featured Collection
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={`${product.image}?auto=format&fit=crop&w=800&q=80`}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-50 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Designed for Modern Lifestyle
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            Clean design, premium materials, and timeless looks — built to match
            your daily life.
          </p>
          <Link
            to="/shop/product-list"
            className="inline-block px-10 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
          >
            View All Products
          </Link>
        </div>
      </section>
    </Template>
  );
};

export default Landing;
