import axios from "axios";

const api = axios.create({
  // Use environment variable for production, fallback to /api for local
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api", 
});

api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("admin_jwt") : null;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;