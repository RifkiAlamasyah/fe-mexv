import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Template from "../../components/Template";
import FlashMessage from "../../components/atoms/FlashMessage";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from 'sweetalert2';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const flashMessage = useSelector(state => state.utility.flashMessage);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:6960/api/products');
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
      }
    };

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
        const { data } = await axios.delete(`http://localhost:6960/api/products/${id}`);
        if (data.rc === "00") {
          setProducts(products.filter(product => product.id !== id));
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
      imageWidth: '50%',
      imageHeight: 'auto',
      grow: 'fullscreen'
    });
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
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
                  ))}
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