import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-green-800 text-white p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
      
      <nav>
        <ul className="space-y-2">
          <li>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => 
                `block p-2 rounded hover:bg-green-700 ${isActive ? 'bg-green-600' : ''}`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li className="relative group">
            <button className="w-full flex justify-between items-center p-2 rounded hover:bg-green-700">
              <span>Manage Products</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <ul className="ml-4 mt-1 hidden group-hover:block bg-green-900 rounded">
              <li>
                <NavLink 
                  to="/admin/products" 
                  className={({ isActive }) => 
                    `block p-2 rounded hover:bg-green-800 ${isActive ? 'bg-green-700' : ''}`
                  }
                >
                  All Products
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/products/create" 
                  className={({ isActive }) => 
                    `block p-2 rounded hover:bg-green-800 ${isActive ? 'bg-green-700' : ''}`
                  }
                >
                  Add New Product
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <button className="w-full text-left p-2 rounded hover:bg-green-700">
              Sales Report (Coming Soon)
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;