import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../../components/molecules/Sidebar";
import Template from "../../../components/Template";
import FlashMessage from "../../../components/atoms/FlashMessage";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import api from "../../../api/axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState({
    name: '',
    code: ''
  });
  const [isSearching, setIsSearching] = useState(false);
  const flashMessage = useSelector(state => state.utility.flashMessage);

  // Fetch all products or search products
  const fetchProducts = async (searchParams = {}) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (searchParams.name) params.append('nama_product', searchParams.name);
      if (searchParams.code) params.append('kode_product', searchParams.code);
      
      const { data } = await api.get(`http://localhost:6960/api/products?${params.toString()}`);
      
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

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const { data } = await api.delete(`http://localhost:6960/api/products/${id}`);
        if (data.rc === "00") {
          // Refresh the list after deletion
          fetchProducts(searchTerm);
          Swal.fire(
            'Deleted!',
            'Your product has been deleted.',
            'success'
          );
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        Swal.fire(
          'Error!',
          'Failed to delete product',
          'error'
        );
      }
    }
  };

  const showImagePreview = (imageUrl, productName) => {
    Swal.fire({
      title: productName,
      imageUrl: imageUrl,
      imageAlt: productName,
      showConfirmButton: false,
      background: 'transparent',
      backdrop: `
        rgba(0,0,0,0.8)
        url("/images/zoom-in-cursor.png")
        center top
        no-repeat
      `,
      showCloseButton: true,
      width: '80%',
      padding: '0',
      imageWidth: '100%',
      imageHeight: 'auto',
      grow: 'fullscreen'
    });
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchTerm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setIsSearching(true);
    fetchProducts(searchTerm);
  };

  const handleResetSearch = () => {
    setSearchTerm({ name: '', code: '' });
    fetchProducts(); // Fetch all products
  };

  return (
    <Template>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 px-[32px] py-5 m-2 rounded min-h-screen bg-neutral-100">
          {flashMessage.type !== "" && (
            <FlashMessage
              title={flashMessage.title}
              subTitle={flashMessage.subTitle}
              type={flashMessage.type}
            />
          )}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-green-600">Product List</h1>
            <Link 
              to="/admin/products/create" 
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add New Product
            </Link>
          </div>
          
          <div className="bg-white p-4 rounded shadow mb-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-700">Search Products</h2>
            <form onSubmit={handleSearchSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={searchTerm.name}
                    onChange={handleSearchChange}
                    placeholder="Product name..."
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Code</label>
                  <input
                    type="text"
                    name="code"
                    value={searchTerm.code}
                    onChange={handleSearchChange}
                    placeholder="Product code..."
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div className="flex items-end space-x-2">
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-400 flex items-center"
                  >
                    {isSearching ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Searching...
                      </>
                    ) : 'Search'}
                  </button>
                  <button
                    type="button"
                    onClick={handleResetSearch}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </form>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
            </div>
          ) : (
            <div className="bg-white rounded shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.length > 0 ? (
                    products.map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {product.gambar_url && (
                            <img 
                              src={product.gambar_url} 
                              alt={product.nama_product} 
                              className="h-10 w-10 rounded-full object-cover cursor-pointer hover:opacity-75 transition-opacity"
                              onClick={() => showImagePreview(product.gambar_url, product.nama_product)}
                            />
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{product.nama_product}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{product.kode_product}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Rp {product.harga_product}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Link
                            to={`/admin/products/edit/${product.id}`}
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                        {isSearching ? 'Searching...' : 'No products found'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Template>
  );
};

export default Products;