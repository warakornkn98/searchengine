import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

export const isTokenValid = (token) => {
  try {
    const { exp } = jwtDecode(token);
    return dayjs().isBefore(dayjs.unix(exp));
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
