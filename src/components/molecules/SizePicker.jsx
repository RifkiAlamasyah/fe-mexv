import React from "react";

const SizePicker = ({ item, options, activeSize, onClick }) => {
  return (
    <div className="flex space-x-2">
      {options.map((s) => {
        const isActive = activeSize === item.kode_product && item.size === s;
        const isSelected = item.size === s;

        return (
          <button
            key={s}
            onClick={() => onClick(item.kode_product, s)}
            className={`px-2 py-1 rounded border cursor-pointer
              ${isSelected ? "border-blue-500 bg-blue-100" : "border-gray-300"}
              transform transition-transform duration-200 ${isActive ? "scale-110" : "scale-100"}`}
          >
            {s}
          </button>
        );
      })}
    </div>
  );
};

export default SizePicker;
