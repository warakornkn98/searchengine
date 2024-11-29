import { jwtDecode } from "jwt-decode"; // ใช้ named import ที่ถูกต้อง
import dayjs from "dayjs";

export const isTokenValid = (token) => {
  try {
    const { exp } = jwtDecode(token); // decode token เพื่อดูค่า exp
    return dayjs().isBefore(dayjs.unix(exp)); // ตรวจสอบ token หมดอายุหรือไม่
  } catch (error) {
    return false;
  }
};

export const clearAuthData = () => {
  localStorage.removeItem("userData.token");
};

export const saveToken = (token) => {
  localStorage.setItem("userData.token", token);
};
