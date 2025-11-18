import React, { useState, useEffect } from "react";
import Template from "../../../components/Template";
import Sidebar from "../../../components/molecules/Sidebar";
import api from "../../../api/axios";
import Swal from "sweetalert2";

const BASE_URL = "http://localhost:6960";

// NORMALIZATION FIX —> flatten nested array + bersihkan domain
const normalizeProductImages = (detail_gambar) => {
  if (!Array.isArray(detail_gambar)) return [];

  // detail_gambar = [ ["url1", "url2"] ] -> flatten -> ["url1","url2"]
  const flat = detail_gambar.flat();

  return flat.map((fullUrl) => {
    const clean = fullUrl.replace(BASE_URL, ""); // sekarang = "/public/uploads/..."

    return {
      preview: fullUrl,
      file: null,
      isNew: false,
      isDeleted: false,
      image_path: clean.startsWith("/") ? clean : `/${clean}`,
    };
  });
};

const ListProductImg = () => {
  const [products, setProducts] = useState([]);
  const [productImages, setProductImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const { data: productRes } = await api.get(
        "http://localhost:6960/api/products"
      );
      const { data: detailRes } = await api.get(
        "http://localhost:6960/api/products/detail-img"
      );

      const detailImages =
        detailRes.rc === "00" && Array.isArray(detailRes.data)
          ? detailRes.data
          : [];

      const merged = productRes.data.map((p) => {
        const images = detailImages
          .filter((img) => img.kode_product === p.kode_product)
          .map((img) => img.detail_gambar);

        return { ...p, detail_gambar: images };
      });

      setProducts(merged);

      // NORMALIZE yang benar
      const normalized = {};
      merged.forEach((prod) => {
        normalized[prod.kode_product] = normalizeProductImages(
          prod.detail_gambar
        );
      });

      setProductImages(normalized);
    } catch (err) {
      Swal.fire("Error", "Gagal memuat produk", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddImage = (e, kode_product) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newItems = files.map((file) => ({
      preview: URL.createObjectURL(file),
      file,
      isNew: true,
      isDeleted: false,
      image_path: null,
    }));

    setProductImages((prev) => ({
      ...prev,
      [kode_product]: [...(prev[kode_product] || []), ...newItems],
    }));
  };

  const handleRemovePreview = (kode_product, index) => {
    setProductImages((prev) => {
      const arr = [...prev[kode_product]];

      if (arr[index].isNew) {
        arr.splice(index, 1);
      } else {
        arr[index].isDeleted = true;
      }

      return { ...prev, [kode_product]: arr };
    });
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const entries = Object.entries(productImages);

      const tasks = entries.map(async ([kode, imgs]) => {
        const newFiles = imgs.filter((i) => i.isNew && i.file);
        const deleted = imgs
          .filter((i) => !i.isNew && i.isDeleted)
          .map((i) => i.image_path);

        // Upload baru
        if (newFiles.length > 0) {
          const formData = new FormData();
          formData.append("kode_product", kode);

          newFiles.forEach((i) => formData.append("product_images", i.file));

          await api.post(
            "http://localhost:6960/api/products/upload-images",
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
        }

        // Delete lama
        if (deleted.length > 0) {
          await api.post("http://localhost:6960/api/products/delete-images", {
            kode_product: kode,
            images: deleted,
          });
        }
      });

      await Promise.all(tasks);

      Swal.fire("Success", "Gambar berhasil diperbarui", "success");
      fetchProducts();
    } catch (err) {
      Swal.fire("Error", "Gagal menyimpan perubahan", "error");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <Template>
      <div className="flex">
        <Sidebar />

        <div className="flex-1 px-[32px] py-5 bg-neutral-100 min-h-screen">
          <h1 className="text-2xl font-bold text-green-600 mb-4">
            Product Image List
          </h1>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 mb-5 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {products.map((product) => {
              const imgs = productImages[product.kode_product] || [];

              return (
                <div
                  key={product.kode_product}
                  className="bg-white rounded shadow p-3"
                >
                  <img
                    src={product.gambar_url}
                    className="w-full h-40 object-cover rounded"
                    alt={product.nama_product}
                  />

                  <p className="mt-2 font-semibold">{product.nama_product}</p>

                  {/* Thumbnail */}
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {imgs.map(
                      (img, i) =>
                        !img.isDeleted && (
                          <div
                            key={i}
                            className="w-14 h-14 relative border rounded overflow-hidden"
                          >
                            <img
                              src={img.preview}
                              className="w-full h-full object-cover"
                              alt=""
                            />
                            <button
                              onClick={() =>
                                handleRemovePreview(product.kode_product, i)
                              }
                              className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded px-1"
                            >
                              ✕
                            </button>
                          </div>
                        )
                    )}

                    {/* Tombol + */}
                    <label
                      htmlFor={`file-${product.kode_product}`}
                      className="w-14 h-14 border-2 border-dashed border-green-400 rounded flex justify-center items-center text-green-600 cursor-pointer hover:bg-green-100"
                    >
                      +
                    </label>

                    <input
                      id={`file-${product.kode_product}`}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) =>
                        handleAddImage(e, product.kode_product)
                      }
                      className="hidden"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Template>
  );
};

export default ListProductImg;
