import React from "react";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../store/slices/cartSlice";
import ColorPicker from "./ColorPicker";
import SizePicker from "./SizePicker";
import QuantityPicker from "./QuantityPicker";
import { rupiah } from "../../helper/mataUang";

const CartItem = ({ item, warnaOptions, sizeOptions, activeColor, activeSize, onColorClick, onSizeClick }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(item.kode_product));
  };

  const handleQuantityChange = (newQty) => {
    if (newQty < 1) return;
    dispatch(updateQuantity({ kode_product: item.kode_product, quantity: newQty }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b items-center">
      {/* PRODUCT */}
      <div className="md:col-span-6 flex items-center space-x-4">
        <img src={item.gambar_url} alt={item.nama_product} className="w-20 h-20 object-cover rounded" />
        <div>
          <h3 className="font-medium">{item.nama_product}</h3>
          <button onClick={handleRemove} className="text-red-500 flex items-center mt-1 text-sm">
            <FiTrash2 className="mr-1" /> Remove
          </button>
        </div>
      </div>

      {/* WARNA */}
      <div className="md:col-span-2 flex justify-center items-center">
        <ColorPicker
          item={item}
          options={warnaOptions}
          activeColor={activeColor}
          onClick={onColorClick}
        />
      </div>

      {/* SIZE */}
      <div className="md:col-span-2 flex justify-center items-center">
        <SizePicker
          item={item}
          options={sizeOptions}
          activeSize={activeSize}
          onClick={onSizeClick}
        />
      </div>

      {/* QUANTITY */}
      <div className="md:col-span-2 flex justify-center items-center">
        <QuantityPicker
          quantity={item.quantity}
          onChange={(newQty) => handleQuantityChange(newQty)}
        />
      </div>

      {/* TOTAL */}
      <div className="md:col-span-2 flex justify-end items-center">
        {rupiah(item.harga_product * item.quantity)}
      </div>
    </div>
  );
};

export default CartItem;
