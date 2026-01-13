import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Template from "../../components/Template";
import api from "../../api/axios";
import Swal from "sweetalert2";
import Pagination from "../../components/molecules/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/slices/productSlice";

const ProductList = () => {
  const [isSearching, setIsSearching] = useState(false);

  const dispatch = useDispatch();

  const {
      products,
      pagination,
      page,
      loading,
    } = useSelector((state) => state.product);

  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  useEffect(() => {
      dispatch(fetchProducts(1));
    }, [dispatch]);


  const addCart = (kode) => {
    token ? navigate("/shop/cart") : navigate("/login");
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price || 0);

  return (
    <Template>
      {/* HEADER */}
      <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Our Products
          </h1>
          <p className="text-lg md:text-xl max-w-2xl">
            Browse our wide selection of premium tech products
          </p>
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Loading products...
          </p>
        </div>
      )}

      {/* CONTENT */}
      {!loading && (
        <div className="container mx-auto px-4 py-6">
          {/* GRID (UI ASLI KAMU) */}
          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-8">
                {products.map((product) => (
                  <div
                    key={product.kode_product}
                    className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 flex"
                  >
                    <div className="relative h-90 w-80 overflow-hidden group">
                      <img
                        src={
                          product.gambar_url ||
                          "https://placehold.co/500x500"
                        }
                        alt={product.nama_product}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>

                    <div className="p-6 flex flex-col justify-between w-80">
                      <h3 className="text-lg font-semibold">
                        {product.nama_product}
                      </h3>

                      <p className="text-gray-600 text-xs line-clamp-2 mt-4">
                        {product.deskripsi_product ||
                          "No description available"}
                      </p>

                      <div className="xl:flex justify-between items-center mt-4">
                        <span className="text-sm xl:text-xl font-bold text-blue-600">
                          {formatPrice(
                            product.harga_product
                          )}
                        </span>

                        <button
                          onClick={() =>
                            addCart(product.kode_product)
                          }
                          className="px-4 py-2 bg-blue-500 text-white rounded text-xs xl:text-sm hover:bg-blue-600 transition"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Pagination
                page={page}
                pagination={pagination}
                onPageChange={(p) => dispatch(fetchProducts(p))}
                tabs_color={'bg-blue-600'}
              />
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-600">
                No products found
              </h3>
            </div>
          )}
        </div>
      )}
    </Template>
  );
};

export default ProductList;
