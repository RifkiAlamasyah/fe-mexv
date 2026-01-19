import React from "react";

const Loading = ({ show }) => {
  if (!show) return null;

  return (
    <div
      className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-black/70
        pointer-events-auto
      "
    >
      <div className="w-14 h-14 border-4 border-gray-300 border-t-cyan-400 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
