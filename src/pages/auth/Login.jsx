import React, { useState, useEffect } from "react";
import axios from "axios";
import Template from "../../components/Template";
import { NavLink, useNavigate } from "react-router-dom";
import FlashMessage from "../../components/atoms/FlashMessage";
import { useDispatch, useSelector } from "react-redux";
import {
  setFlashMessage,
  clearFlashMessage,
} from "../../store/slices/utilitySlice";
import { jwtDecode } from "jwt-decode";
import Loading from "../../components/atoms/Loading";
import api from "../../api/axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const flashMessage = useSelector((state) => state.utility.flashMessage);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (flashMessage.type !== "") {
      window.scrollTo({ top: 0, behavior: "smooth" });

      const timer = setTimeout(() => {
        dispatch(clearFlashMessage());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [flashMessage, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setMessage("");

    // Input validation
    if (!username.trim() || !password.trim()) {
      setMessage("Username dan password harus diisi");
      return;
    }

    try {
      // 1. Login request
      setLoading(true);
      const response = await api.post("/api/login", {
        username: username.trim(),
        password: password.trim(),
      });

      // 2. Validate response
      if (!response.data?.token) {
        throw new Error("Invalid server response");
      }

      // 3. Store token securely
      sessionStorage.setItem("token", response.data.token);

      // 4. Decode token to get user role
      const decodedToken = jwtDecode(response.data.token);

      // Debugging: Log decoded token
      console.log("Decoded Token:", decodedToken);


      // 5. Redirect based on role
      const redirectPath =
        decodedToken.role === "admin" ? "/dashboard" : "/shop/product-list";

      navigate(redirectPath);

      // Optional: Show success message
      setMessage("Login berhasil! Mengalihkan...");
    } catch (error) {
      console.error("Login error:", error);

      // Handle different error cases
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Terjadi kesalahan saat login";

      setMessage(errorMessage);

      // Clear sensitive data on error
      sessionStorage.removeItem("token");
    } finally {
      // Clear password field for security
      setPassword("");
      setLoading(false);
    }
  };
  return (
  <Template>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex items-center justify-center px-4">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* LEFT - IMAGE / BRAND */}
        <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-blue-500 text-white p-10">
          <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
          <p className="text-sm text-blue-100 text-center max-w-xs">
            Login to manage your account and explore our products easily.
          </p>
        </div>

        {/* RIGHT - FORM */}
        <section className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            
            {flashMessage.type !== "" && (
              <FlashMessage
                title={flashMessage.title}
                subTitle={flashMessage.subTitle}
                type={flashMessage.type}
              />
            )}

            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Sign in
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              Enter your credentials to continue
            </p>

            <p className="text-red-500 text-sm mb-4">{message}</p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              
              {/* USERNAME */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* REMEMBER + FORGOT */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  Remember me
                </label>
                <a href="#" className="text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                Sign in
              </button>

              {/* REGISTER */}
              <p className="text-center text-sm text-gray-500 mt-6">
                Don’t have an account?{" "}
                <a href="/register" className="text-blue-600 font-medium hover:underline">
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </section>

      </div>

      <Loading show={loading} />
    </div>
  </Template>

  );
};

export default Login;
