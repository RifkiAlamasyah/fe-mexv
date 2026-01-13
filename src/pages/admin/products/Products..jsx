import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import Template from "../../../components/Template";
import Sidebar from "../../../components/molecules/Sidebar";
import FlashMessage from "../../../components/atoms/FlashMessage";
import Pagination from "../../../components/molecules/Pagination";

import api from "../../../api/axios";
import {
  fetchProducts,
  resetSearch,
} from "../../../store/slices/productSlice";

const Products = () => {
  const dispatch = useDispatch();

  const {
    products,
    pagination,
    page,
    loading,
    search,
  } = useSelector((state) => state.product);

  const flashMessage = useSelector((state) => state.utility.flashMessage);

  const [searchTerm, setSearchTerm] = useState({
    name: "",
    code: "",
  });

  /* ======================
     LOAD AWAL
  ====================== */
  useEffect(() => {
    dispatch(fetchProducts({ page: 1 }));
  }, [dispatch]);

  /* ======================
     SEARCH HANDLER
  ====================== */
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchTerm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(
      fetchProducts({
        page: 1,
        search: searchTerm,
      })
    );
  };

  const handleResetSearch = () => {
    setSearchTerm({ name: "", code: "" });
    dispatch(resetSearch());
    dispatch(fetchProducts({ page: 1 }));
  };

  /* ======================
     DELETE
  ====================== */
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const { data } = await api.delete(`/api/products/${id}`);

      if (data.rc === "00") {
        Swal.fire("Deleted!", "Product removed", "success");

        // reload dengan search & page yang sama
        dispatch(
          fetchProducts({
            page,
            search,
          })
        );
      }
    } catch (err) {
      Swal.fire("Error", "Failed to delete product", "error");
    }
  };

  return (
    <Template>
      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-6 bg-neutral-100 min-h-screen">
          {flashMessage?.type && (
            <FlashMessage
              title={flashMessage.title}
              subTitle={flashMessage.subTitle}
              type={flashMessage.type}
            />
          )}

          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-green-600">
              Product List
            </h1>
            <Link
              to="/admin/products/create"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Product
            </Link>
          </div>

          {/* SEARCH */}
          <div className="bg-white p-4 rounded shadow mb-6">
            <form onSubmit={handleSearchSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Product Name</label>
                  <input
                    name="name"
                    value={searchTerm.name}
                    onChange={handleSearchChange}
                    className="w-full border p-2 rounded"
                    placeholder="Search name"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Product Code</label>
                  <input
                    name="code"
                    value={searchTerm.code}
                    onChange={handleSearchChange}
                    className="w-full border p-2 rounded"
                    placeholder="Search code"
                  />
                </div>

                <div className="flex items-end gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Search
                  </button>
                  <button
                    type="button"
                    onClick={handleResetSearch}
                    className="px-4 py-2 bg-gray-200 rounded"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded shadow overflow-hidden">
            {loading ? (
              <div className="p-10 text-center">Loading...</div>
            ) : (
              <>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium">
                        Code
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {products.length > 0 ? (
                      products.map((p) => (
                        <tr key={p.id}>
                          <td className="px-6 py-3">
                            {p.nama_product}
                          </td>
                          <td className="px-6 py-3">
                            {p.kode_product}
                          </td>
                          <td className="px-6 py-3">
                            Rp {p.harga_product}
                          </td>
                          <td className="px-6 py-3 space-x-3">
                            <Link
                              to={`/admin/products/edit/${p.id}`}
                              className="text-indigo-600"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(p.id)}
                              className="text-red-600"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="text-center py-6 text-gray-500"
                        >
                          No products found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </>
            )}
          </div>

            <div className="bg-white p-4 rounded shadow mt-5">
               {pagination.totalPages > 1 && (
                  <Pagination
                    page={page}
                    pagination={pagination}
                    onPageChange={(p) =>
                      dispatch(
                        fetchProducts({
                          page: p,
                          search,
                        })
                      )
                    }
                    tabs_color={'bg-green-600'}
                  />
                )}
            </div>
        </div>
      </div>
    </Template>
  );
};

export default Products;
