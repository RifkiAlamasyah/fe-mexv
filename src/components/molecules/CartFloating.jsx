import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

const CartFloating = () => {
  const items = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
    className="hidden md:flex fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg cursor-pointer z-50 items-center justify-center"
      onClick={() => navigate("/shop/cart")}
    >
      <FiShoppingCart size={24} />
      {totalQuantity > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 w-5 h-5 text-xs rounded-full flex items-center justify-center font-bold">
          {totalQuantity}
        </span>
      )}
    </div>
  );
};

export default CartFloating;
