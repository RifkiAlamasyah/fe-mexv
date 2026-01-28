import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Template from "../../components/Template";
import CartItem from "../../components/molecules/CartItem";
import { saveCart, updateWarna, updateSize } from "../../store/slices/cartSlice";
import { rupiah } from "../../helper/mataUang";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const loading = useSelector((state) => state.cart.loading);

  const warnaOptions = ["abu", "hitam", "marron", "hijau"];
  const sizeOptions = ["M", "L", "XL", "XXL"];

  const [activeColor, setActiveColor] = useState(null);
  const [activeSize, setActiveSize] = useState(null);

  const handleColorClick = (kode_product, warna) => {
    setActiveColor(kode_product);
    dispatch(updateWarna({ kode_product, warna }));
   
  };

  const handleSizeClick = (kode_product, size) => {
    setActiveSize(kode_product);
    dispatch(updateSize({ kode_product, size }));
    setTimeout(() => setActiveSize(null), 200);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.harga_product * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleSaveCart = () => {
    const payload = {
      items: cartItems.map((item) => ({
        kode_product: item.kode_product,
        nama_product: item.nama_product,
        harga_product: item.harga_product,
        quantity: item.quantity,
        gambar_url: item.gambar_url,
        deskripsi_product: item.deskripsi_product,
        warna: item.warna || null,
        size: item.size || null
      })),
      subtotal,
      tax,
      total,
      status: "saved"
    };

    dispatch(saveCart(payload))
      .unwrap()
      .then(() => navigate("/shop/product-list"))
      .catch(() => alert("Gagal menyimpan belanjaan"));
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      dispatch(saveCart({
        items: [],
        subtotal: 0,
        tax: 0,
        total: 0,
        status: "saved",
      }));
    }
  }, [cartItems.length, dispatch]);

  return (
    <Template>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl mb-4">Your cart is empty</p>
            <Link to="/shop/product-list" className="px-6 py-2 bg-blue-600 text-white rounded">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
              <div className="hidden md:grid grid-cols-12 bg-gray-100 p-4 font-semibold">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Warna</div>
                <div className="col-span-2 text-center">Size</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {cartItems.map(item => (
                <CartItem
                  key={item.kode_product}
                  item={item}
                  warnaOptions={warnaOptions}
                  sizeOptions={sizeOptions}
                  activeColor={activeColor}
                  activeSize={activeSize}
                  onColorClick={handleColorClick}
                  onSizeClick={handleSizeClick}
                />
              ))}
            </div>

            {/* SUMMARY */}
            <div className="bg-white rounded-lg shadow p-6 md:w-1/3 ml-auto">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between"><span>Subtotal</span><span>{rupiah(subtotal)}</span></div>
                <div className="flex justify-between"><span>Tax (10%)</span><span>{rupiah(tax)}</span></div>
                <div className="flex justify-between border-t pt-3 font-bold text-lg"><span>Total</span><span>{rupiah(total)}</span></div>
              </div>

              <button onClick={handleSaveCart} disabled={loading} className="w-full bg-green-600 text-white py-3 rounded-lg">
                {loading ? "Menyimpan..." : "Simpan Belanjaan"}
              </button>

              <div className="mt-4 text-center">
                <Link to="/shop/product-list" className="text-blue-600 hover:underline">Continue Shopping</Link>
              </div>
            </div>
          </>
        )}
      </div>
    </Template>
  );
};

export default Cart;
