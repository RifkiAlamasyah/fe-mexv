import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";  // Ensure NavLink is imported
import axios from "axios";
import api from "../../api/axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for toggling menu
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logout = async () => {
    const token = sessionStorage.getItem("token");

    if (token) {
      try {
        await api.post("/api/logout");
        
        // Hapus token
        sessionStorage.removeItem("token");

        // Redirect ke login
        navigate("/login");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    }
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            My Website
          </span>
        </a>
        <button onClick={toggleMenu} className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
        <div className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`} id="mobile-menu">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink to="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about/Rifki Ganteng" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100">About</NavLink>
            </li>
            <li>
              {/* Show 'Logout' if the token exists in localStorage */}
              {sessionStorage.getItem("token") ? (
                <button onClick={logout} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100">Logout</button>
              ) : (
                <NavLink to="/login" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100">Login</NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
