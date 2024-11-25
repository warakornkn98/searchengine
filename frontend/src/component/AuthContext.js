import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (username, password, navigate) => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token); // เก็บ token ใน localStorage
      setIsLoggedIn(true);

      message.success("เข้าสู่ระบบสำเร็จ");
      navigate("/search"); // เปลี่ยนเส้นทางไปยัง /search
    } catch (error) {
      console.error(error);
      message.error("เข้าสู่ระบบล้มเหลว โปรดลองอีกครั้ง");
    }
  };

  const logout = (navigate) => {
    localStorage.removeItem("token"); // ลบ token ออกจาก localStorage
    setIsLoggedIn(false); // รีเซ็ตสถานะการล็อกอิน
    message.success("ออกจากระบบสำเร็จ");
    navigate("/login"); // เปลี่ยนเส้นทางไปยังหน้า login
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
