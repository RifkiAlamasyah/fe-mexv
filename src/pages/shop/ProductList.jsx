import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Template from "../../components/Template";

const ProductList = () => {
  const products = [
    {
      kode_product: 1,
      name: "Premium Headphone",
      price: "$199",
      description: "Noise-cancelling wireless headphones with 30hr battery life",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      category: "Audio",
      rating: 4.8
    },
    {
      kode_product: 2,
      name: "Smart Watch Pro",
      price: "$249",
      description: "Track your fitness and receive notifications on your wrist",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      category: "Wearables",
      rating: 4.6
    },
    {
      kode_product: 3,
      name: "Wireless Earbuds",
      price: "$129",
      description: "Compact earbuds with crystal clear sound quality",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
      category: "Audio",
      rating: 4.5
    },
    {
      kode_product: 4,
      name: "4K Camera",
      price: "$599",
      description: "Professional camera with 4K video recording",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
      category: "Photography",
      rating: 4.9
    },
    {
      kode_product: 5,
      name: "Gaming Keyboard",
      price: "$89",
      description: "Mechanical keyboard with RGB lighting",
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
      category: "Gaming",
      rating: 4.3
    },
    {
      kode_product: 6,
      name: "Portable Speaker",
      price: "$79",
      description: "Waterproof Bluetooth speaker with 20W output",
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb",
      category: "Audio",
      rating: 4.2
    },
    {
      kode_product: 7,
      name: "Ultra HD Monitor",
      price: "$349",
      description: "32-inch 4K monitor with HDR support",
      image: "https://images.unsplash.com/photo-1546538915-a9e2c8d0a8e1",
      category: "Computer",
      rating: 4.7
    },
    {
      kode_product: 8,
      name: "Wireless Charger",
      price: "$49",
      description: "Fast charging pad for all Qi-enabled devices",
      image: "https://images.unsplash.com/photo-1587033411394-4b47bc97c8b4",
      category: "Accessories",
      rating: 4.0
    },
    {
      kode_product: 9,
      name: "Laptop Stand",
      price: "$39",
      description: "Ergonomic aluminum stand for laptops",
      image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45",
      category: "Accessories",
      rating: 4.1
    }
  ];

  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');

  const addCart = (kode) => {
    if(token !== null){
      navigate('/shop/cart');
    }else{
      navigate('/login');
    }
  };

  return (
    <Template>
      {/* Product List Header */}
      <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Products</h1>
          <p className="text-lg md:text-xl max-w-2xl">
            Browse our wide selection of premium tech products
          </p>
        </div>
      </div>

      {/* Product Filters and Sorting */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select className="block appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Categories</option>
                <option>Audio</option>
                <option>Wearables</option>
                <option>Photography</option>
                <option>Gaming</option>
                <option>Computer</option>
                <option>Accessories</option>
              </select>
            </div>
            <div className="relative">
              <select className="block appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Customer Rating</option>
                <option>Newest Arrivals</option>
              </select>
            </div>
          </div>
          <div className="text-gray-600">
            Showing {products.length} products
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div 
              key={product.kode_product} 
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 flex flex-col"
            >
              <div className="relative h-48 overflow-hidden group">
                <img
                  src={`${product.image}?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80`}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                  {product.category}
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <div className="flex items-center text-yellow-500">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                    <span className="ml-1 text-gray-600 text-sm">{product.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-xl font-bold text-blue-600">
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

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-1 rounded border border-gray-300 text-gray-500 hover:bg-gray-100">
              Previous
            </button>
            <button className="px-3 py-1 rounded bg-blue-500 text-white">
              1
            </button>
            <button className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-100">
              2
            </button>
            <button className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-100">
              3
            </button>
            <button className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-100">
              Next
            </button>
          </nav>
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="bg-gray-100 py-16 mt-12">
        <div className="container mx-auto text-center px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter for the latest products and deals
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </Template>
  );
};

export default ProductList;