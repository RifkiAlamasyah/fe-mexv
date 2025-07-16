import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Template from "../../components/Template";
import api from "../../api/axios";
import Swal from "sweetalert2";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');

  // Fetch all products or search products
  const fetchProducts = async (searchParams = {}) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (searchParams.name) params.append('nama_product', searchParams.name);
      if (searchParams.code) params.append('kode_product', searchParams.code);
      
      const { data } = await api.get(`/api/products?${params.toString()}`);
      
      if (data.rc === "00") {
        setProducts(data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      Swal.fire(
        'Error!',
        'Failed to load products',
        'error'
      );
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchProducts();
  }, []);

  const addCart = (kode) => {
    if(token !== null){
      navigate('/shop/cart');
    }else{
      navigate('/login');
    }
  };

  // Format price to currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
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

      {/* Loading State */}
      {loading && (
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      )}

      {/* Product Content */}
      {!loading && (
        <div className="container mx-auto px-4 py-6">
          {/* Product Filters and Sorting */}
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
          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product) => (
                  <div 
                    key={product.kode_product} 
                    className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 flex flex-col"
                  >
                    <div className="relative h-48 overflow-hidden group">
                      <img
                        src={product.gambar_url|| "https://placehold.co/500x500"}
                        alt={product.nama_product}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://placehold.co/500x500";
                        }}
                      />
                      {product.category && (
                        <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                          {product.category}
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">{product.nama_product}</h3>
                        {product.rating && (
                          <div className="flex items-center text-yellow-500">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                            </svg>
                            <span className="ml-1 text-gray-600 text-sm">{product.rating}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-4 truncate">{product.deskripsi_product || "No description available"}</p>
                      <div className="mt-auto flex justify-between items-center">
                        <span className="text-xl font-bold text-blue-600">
                          {formatPrice(product.harga_product || 0)}
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
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-600">No products found</h3>
              <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      )}

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