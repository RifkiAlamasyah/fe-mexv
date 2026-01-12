import React from "react";

const Pagination = ({ page, pagination, onPageChange }) => {
  if (pagination.totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-12">
      <nav className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>

        <div className="flex gap-2 ">
          {Array.from({ length: pagination.totalPages }, (_, i) => {
            const p = i + 1;
            return (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`px-3 py-1 border rounded
                  ${
                    page === p
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === pagination.totalPages}
        >
          Next
        </button>
      </nav>
    </div>
  );
};


export default Pagination;
