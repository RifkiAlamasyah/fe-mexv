import { createContext, useContext, useEffect, useState } from "react";
import {clearCart } from "../store/slices/cartSlice";
import {useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const session = await api.get("/api/auth/session");

        if (session.data.loggedIn) {
          api.defaults.headers.common.Authorization =
            `Bearer ${session.data.token}`;
          setUser(session.data.user);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);
    const login = (userData) => {
    console.log(userData)
      setUser(userData);
    };
  const logout = async () => {
    await api.post("/api/logout");
    setUser(null);
    sessionStorage.removeItem("token");
    dispatch(clearCart());
    navigate("/login");
    

  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
