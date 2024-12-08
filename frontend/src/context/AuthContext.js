import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenValid, clearAuthData } from "../utils/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    id: 1,
    username: "admin",
    fname: "admin",
    lname: "admin",
    agency: "หน่วยงานตัวอย่าง",
    department: "แผนกตัวอย่าง",
    position: "ตำแหน่งตัวอย่าง",
  });

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("userData.token");
      if (token && isTokenValid(token)) {
        setIsAuthenticated(true);
      } else {
        clearAuthData();
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (token) => {
    setIsAuthenticated(true);
    localStorage.setItem("userData.token", token);
  };

  const logout = () => {
    clearAuthData();
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
