import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Template from "../../components/Template";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
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
  const [originalImage, setOriginalImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

   const fetchProduct = async () => {
      try {
        const response = await axios(`http://localhost:6960/api/products?id=${id}`);
        if (response.data.rc === "00") {
          setFormData({
            kode_product: response.data.data[0].kode_product,
            nama_product: response.data.data[0].nama_product,
            harga_product: response.data.data[0].harga_product,
            deskripsi_product: response.data.data[0].deskripsi_product,
            discount_product: response.data.data[0].discount_product || '0'
          });
          if (response.data.data[0].gambar_url) {
            setPreviewImage(response.data.data[0].gambar_url);
            setOriginalImage(response.data.data[0].gambar_url);
          } 
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsFetching(false);
      }
    };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        gambar_product: file
      }));
      setPreviewImage(URL.createObjectURL(file));
    } else {
      // If user cancels file selection, revert to original image
      setPreviewImage(originalImage);
      setFormData(prev => ({
        ...prev,
        gambar_product: null
      }));
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
      const response = await fetch(`http://localhost:6960/api/products/${id}`, {
        method: 'PUT',
        body: formDataToSend
      });

      const result = await response.json();
      if (result.rc === "00") {
        navigate('/admin/products');
      }
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <Template>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 px-[32px] py-5 m-2 rounded min-h-screen bg-neutral-100 flex items-center justify-center">
            <p>Loading product data...</p>
          </div>
        </div>
      </Template>
    );
  }

  return (
    <Template>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 px-[32px] py-5 m-2 rounded min-h-screen bg-neutral-100">
          <h1 className="text-3xl font-bold mb-6 text-green-600">Edit Product</h1>
          
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
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
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
                    <div className="flex items-center space-x-4">
                      <img 
                        src={previewImage} 
                        alt="Current Preview" 
                        className="h-32 object-contain border rounded"
                      />
                      {previewImage !== originalImage && originalImage && (
                        <>
                          <span className="text-gray-400">→</span>
                          <div className="relative">
                            <img 
                              src={originalImage} 
                              alt="Original" 
                              className="h-32 object-contain border rounded opacity-50"
                            />
                            <span className="absolute top-1 left-1 bg-white px-1 text-xs text-gray-500">Original</span>
                          </div>
                        </>
                      )}
                    </div>
                    {previewImage !== originalImage && (
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewImage(originalImage);
                          setFormData(prev => ({
                            ...prev,
                            gambar_product: null
                          }));
                        }}
                        className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                      >
                        Reset to original image
                      </button>
                    )}
                  </div>
                )}
              </div>
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
                {isLoading ? 'Updating...' : 'Update Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Template>
  );
};

export default EditProduct;