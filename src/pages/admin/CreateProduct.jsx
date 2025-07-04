import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Template from "../../components/Template";
import { useDispatch, useSelector } from "react-redux";
import { setFlashMessage, clearFlashMessage } from "../../store/slices/utilitySlice";
import api from "../../api/axios";
import Swal from 'sweetalert2';

const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    kode_product: "",
    nama_product: "",
    harga_product: "",
    deskripsi_product: "",
    discount_product: "0",
    gambar_product: null,
  });

  const [state, setState] = useState({
    previewImage: null,
    isLoading: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, gambar_product: file }));
      setState((prev) => ({
        ...prev,
        previewImage: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Show confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to create this product?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, create it!'
    });

    if (!result.isConfirmed) {
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true }));

    const formDataToSend = new FormData();
    formDataToSend.append("kode_product", formData.kode_product);
    formDataToSend.append("nama_product", formData.nama_product);
    formDataToSend.append("harga_product", formData.harga_product);
    formDataToSend.append("deskripsi_product", formData.deskripsi_product);
    formDataToSend.append("discount_product", formData.discount_product);
    if (formData.gambar_product) {
      formDataToSend.append("gambar_product", formData.gambar_product);
    }

    try {
      const response = await api.post(
        "http://localhost:6960/api/products",
        formDataToSend
      );
      const result = await response.data;
      
      if (result.rc === "00") {
        await Swal.fire({
          title: 'Success!',
          text: 'Product has been created successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        dispatch(setFlashMessage({ 
          title: "Product Berhasil Di Tambahkan", 
          type: "success" 
        }));
        setTimeout(() => dispatch(clearFlashMessage()), 5000);
        navigate("/admin/products");
      } else {
        Swal.fire(
          'Error!',
          'Failed to create product',
          'error'
        );
      }
    } catch (error) {
      console.error("Error creating product:", error);
      Swal.fire(
        'Error!',
        'An error occurred while creating the product',
        'error'
      );
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <Template>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 px-[32px] py-5 m-2 rounded min-h-screen bg-neutral-100">
          <h1 className="text-3xl font-bold mb-6 text-green-600">
            Create New Product
          </h1>

          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Code
                </label>
                <input
                  type="text"
                  name="kode_product"
                  value={formData.kode_product}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="nama_product"
                  value={formData.nama_product}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  name="harga_product"
                  value={formData.harga_product}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount (%)
                </label>
                <input
                  type="number"
                  name="discount_product"
                  value={formData.discount_product}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  min="0"
                  max="100"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="deskripsi_product"
                  value={formData.deskripsi_product}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  rows="3"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Image
                </label>
                <input
                  type="file"
                  name="gambar_product"
                  onChange={handleImageChange}
                  className="w-full p-2 border rounded"
                  accept="image/*"
                />
                {state.previewImage && (
                  <div className="mt-2">
                    <img
                      src={state.previewImage}
                      alt="Preview"
                      className="h-32 object-contain border rounded"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate("/products")}
                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={state.isLoading}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-400"
              >
                {state.isLoading ? "Creating..." : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Template>
  );
};

export default CreateProduct;