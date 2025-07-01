import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Template from "../../components/Template";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    kode_product: '',
    nama_product: '',
    harga_product: '',
    deskripsi_product: '',
    discount_product: '0',
    gambar_product: null
  });
  const [previewImage, setPreviewImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        gambar_product: file
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('kode_product', formData.kode_product);
    formDataToSend.append('nama_product', formData.nama_product);
    formDataToSend.append('harga_product', formData.harga_product);
    formDataToSend.append('deskripsi_product', formData.deskripsi_product);
    formDataToSend.append('discount_product', formData.discount_product);
    if (formData.gambar_product) {
      formDataToSend.append('gambar_product', formData.gambar_product);
    }

    try {
      const response = await fetch('http://localhost:6960/api/products', {
        method: 'POST',
        body: formDataToSend
      });

      const result = await response.json();
      if (result.rc === "00") {
        navigate('/admin/products');
      }
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Template>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 px-[32px] py-5 m-2 rounded min-h-screen bg-neutral-100">
          <h1 className="text-3xl font-bold mb-6 text-green-600">Create New Product</h1>
          
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
            {/* Form fields same as before */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <label className="block text-sm font-medium text-gray-700 mb-1">Product Code</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="deskripsi_product"
                  value={formData.deskripsi_product}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  rows="3"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                <input
                  type="file"
                  name="gambar_product"
                  onChange={handleImageChange}
                  className="w-full p-2 border rounded"
                  accept="image/*"
                />
                {previewImage && (
                  <div className="mt-2">
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="h-32 object-contain border rounded"
                    />
                  </div>
                )}
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate('/products')}
                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-400"
              >
                {isLoading ? 'Creating...' : 'Create Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Template>
  );
};

export default CreateProduct;