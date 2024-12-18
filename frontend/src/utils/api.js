import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

console.log(apiBaseUrl);

const api = axios.create({
  baseURL: `${apiBaseUrl}`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("userData.token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
