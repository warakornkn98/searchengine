import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenValid, clearAuthData } from "../utils/auth";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("userData.token");
      if (token && isTokenValid(token)) {
        const decoded = jwtDecode(token); // Decode ข้อมูลจาก token
        setIsAuthenticated(true);
        setUserData(decoded.user); // อัปเดต userData จาก token
      } else {
        clearAuthData();
        setIsAuthenticated(false);
        setUserData(null);
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (token) => {
    localStorage.setItem("userData.token", token);
    const decoded = jwtDecode(token); // Decode ข้อมูลจาก token
    setIsAuthenticated(true);
    setUserData(decoded.user); // เซตข้อมูลผู้ใช้
  };

  const logout = () => {
    clearAuthData();
    setIsAuthenticated(false);
    setUserData(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
