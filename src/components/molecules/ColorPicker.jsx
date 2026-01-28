import React from "react";

const ColorPicker = ({ item, options, activeColor, onClick }) => {
  const getBgColor = (w) => {
    switch (w) {
      case "abu": return "#B0B0B0";
      case "hitam": return "#000000";
      case "marron": return "#800000";
      case "hijau": return "#03a300";
      default: return "#fff";
    }
  };

  return (
    <div className="flex space-x-2">
      {options.map((w) => {
        const isActive = activeColor === item.kode_product && item.warna === w;
        const isSelected = item.warna === w;

        return (
          <button
            key={w}
            onClick={() => onClick(item.kode_product, w)}
            className={`w-6 h-6 rounded-full border-2 cursor-pointer
              ${isSelected ? "border-blue-500" : "border-gray-300"}
              transform transition-transform duration-200 ${isActive ? "scale-125" : "scale-100"}`}
            style={{ backgroundColor: getBgColor(w) }}
            title={w}
          />
        );
      })}
    </div>
  );
};

export default ColorPicker;
