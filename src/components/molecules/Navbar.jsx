import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../api/axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "",
    photo_profile: ""
  });
  const navigate = useNavigate();
  const profileRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (token) {
          const response = await api.get("/api/get-profile");
          const data = response.data.data;
          setProfile({
            name: data.nama || "",
            email: data.email || "",
            role: data.role || "User",
            photo_profile: data.photo_profile || `https://ui-avatars.com/api/?name=${data.nama}&background=random`
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (sessionStorage.getItem("token")) {
      fetchProfile();
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logout = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        await api.post("/api/logout");
        sessionStorage.removeItem("token");
        setProfile({
          name: "",
          email: "",
          photo_profile: ""
        });
        navigate("/login");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    }
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-10">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo/Brand */}
          <div className="flex items-center">
            <NavLink 
              to="/" 
              className="text-xl font-semibold text-gray-800 flex items-center"
            >
              <svg className="h-8 w-8 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="hidden sm:inline">MEXV </span>
            </NavLink>
          </div>

          {/* Right side - Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/shop/product-list" 
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`
              }
            >
              Shop
            </NavLink>
            {sessionStorage.getItem("token") ? (
              <div className="relative flex items-center" ref={profileRef}>
         <button 
              onClick={toggleProfile}
              className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="sr-only">Open user menu</span>
              <img 
                className="h-8 w-8 rounded-full object-cover border border-gray-200" 
                src={profile.photo_profile} 
                alt="User profile" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/500x500";
                }}
              />
            </button>

            {/* Dropdown Menu - Diperbaiki posisinya */}
            {isProfileOpen && (
              <div className="origin-top-right absolute right-0 top-full mt-1 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <div className="px-4 py-2 border-b">
                  <div className="text-sm font-medium text-gray-900 truncate">{profile.name}</div>
                  <div className="text-xs text-gray-500 truncate">{profile.role}</div>
                </div>
                <NavLink
                  to="/profile-settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsProfileOpen(false)}
                >
                  Pengaturan Akun
                </NavLink>
                <button
                  onClick={() => {
                    logout();
                    setIsProfileOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
            ) : (
              <NavLink 
                to="/login" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`
                }
              >
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <NavLink
            to="/"
            className={({ isActive }) => 
              `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'}`
            }
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/shop/list-product"
            className={({ isActive }) => 
              `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'}`
            }
            onClick={() => setIsOpen(false)}
          >
            About
          </NavLink>
          {sessionStorage.getItem("token") ? (
            <>
              <div className="px-4 py-2 border-b">
                <div className="text-sm font-medium text-gray-900 truncate">{profile.name}</div>
                <div className="text-xs text-gray-500 truncate">{profile.email}</div>
              </div>
              <NavLink
                to="/profile-settings"
                className={({ isActive }) => 
                  `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'}`
                }
                onClick={() => setIsOpen(false)}
              >
                Pengaturan Akun
              </NavLink>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) => 
                `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'}`
              }
              onClick={() => setIsOpen(false)}
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;