import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);

  // Auto-open dropdown when on child routes
  useEffect(() => {
    if (location.pathname.startsWith("/admin/products")) {
      setOpenDropdown("products");
    } else {
      setOpenDropdown(null);
    }
  }, [location]);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  // Custom NavLink component with consistent styling
  const SidebarLink = ({ to, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block p-2 rounded transition-colors duration-200 ${
          isActive
            ? "bg-green-600 text-white shadow-md"
            : "text-green-100 hover:bg-green-700 hover:text-white"
        }`
      }
    >
      {children}
    </NavLink>
  );

  return (
    <div className="w-64 min-h-screen bg-green-800 p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
      </div>

      <nav>
        <ul className="space-y-1">
          <li>
            <SidebarLink to="/dashboard">Dashboard</SidebarLink>
          </li>

          {/* Products Dropdown */}
          <li>
            <button
              onClick={() => toggleDropdown("products")}
              className={`w-full flex justify-between items-center p-2 rounded transition-colors duration-200 ${
                openDropdown === "products" || location.pathname.startsWith("/admin/products")
                  ? "bg-green-700 text-white"
                  : "text-green-100 hover:bg-green-700 hover:text-white"
              }`}
            >
              <span>Products</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  openDropdown === "products" ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              className={`overflow-hidden transition-all duration-200 ${
                openDropdown === "products" ? "max-h-40" : "max-h-0"
              }`}
            >
              <ul className="ml-4 mt-1 space-y-1 py-1">
                <li>
                  <SidebarLink to="/admin/products">
                    Manage Products
                  </SidebarLink>
                </li>
                <li>
                  <SidebarLink to="/admin/products/design">
                    Product Design Display
                  </SidebarLink>
                </li>
              </ul>
            </div>
          </li>

          {/* Disabled Item */}
          <li>
            <span className="block p-2 rounded text-green-300 opacity-75 cursor-not-allowed">
              Sales Report (Coming Soon)
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;