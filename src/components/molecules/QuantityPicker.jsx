
import React from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const QuantityPicker = ({ quantity, onChange }) => {
  return (
    <div className="flex items-center border rounded">
      <button onClick={() => onChange(quantity - 1)} className="px-3 py-1">
        <FiMinus />
      </button>
      <span className="px-4 py-1">{quantity}</span>
      <button onClick={() => onChange(quantity + 1)} className="px-3 py-1">
        <FiPlus />
      </button>
    </div>
  );
};

export default QuantityPicker;
