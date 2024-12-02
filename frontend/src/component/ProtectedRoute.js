import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // รอให้ loading เสร็จ
  if (loading) {
    return <div>กำลังโหลด...</div>; // หรือใส่ Spinner
  }

  // ถ้าไม่ได้ล็อกอิน ให้ Redirect ไปหน้า login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // ถ้าได้รับการยืนยัน ให้แสดงหน้าที่ร้องขอ
  return children;
};

export default ProtectedRoute;
