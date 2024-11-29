import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenValid, clearAuthData } from "../utils/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userData.token");
    if (token && isTokenValid(token)) {
      setIsAuthenticated(true);
    } else {
      clearAuthData();
      setIsAuthenticated(false);
      navigate("/login");
    }
  }, [navigate]);

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
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
