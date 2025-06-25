import React from "react";
import { Link } from "react-router-dom";
import Template from "../components/Template";
import { NavLink, useNavigate } from "react-router-dom"; 

const Landing = () => {
  // Data produk contoh
  const products = [
    {
      kode_product: 1,
      name: "Premium Headphone",
      price: "$199",
      description: "Noise-cancelling wireless headphones with 30hr battery life",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
    {
      kode_product: 2,
      name: "Smart Watch Pro",
      price: "$249",
      description: "Track your fitness and receive notifications on your wrist",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    },
    {
      kode_product: 3,
      name: "Wireless Earbuds",
      price: "$129",
      description: "Compact earbuds with crystal clear sound quality",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
    },
    {
      kode_product: 4,
      name: "4K Camera",
      price: "$599",
      description: "Professional camera with 4K video recording",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
    },
    {
      kode_product: 5,
      name: "Gaming Keyboard",
      price: "$89",
      description: "Mechanical keyboard with RGB lighting",
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    },
    {
      kode_product: 6,
      name: "Portable Speaker",
      price: "$79",
      description: "Waterproof Bluetooth speaker with 20W output",
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb",
    },
  ];
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token')

  const addCart = (kode) => {
    if(token !== null){
      navigate('/transaction/cart')
    }else{
     navigate('/login')
    }
  }

  return (
    <Template>
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover Amazing Products
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Find the perfect tech gadgets for your lifestyle at unbeatable prices
          </p>
          <Link
            to="/products"
            className="inline-block px-8 py-3 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition duration-300"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Featured Products */}
      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div 
              key={product.kode_product} 
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={`${product.image}?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">
                    {product.price}
                  </span>
                 <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  onClick={() => addCart(product.kode_product)}
                >
                  Add to Cart
                </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Tech?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers enjoying our premium products
          </p>
          <Link
            to="/products"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition duration-300"
          >
            Browse All Products
          </Link>
        </div>
      </div>
    </Template>
  );
};

export default Landing;