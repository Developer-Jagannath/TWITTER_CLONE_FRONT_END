import axios, {  type InternalAxiosRequestConfig } from "axios";


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

export const API_ENDPOINTS = {
    LOGIN: `${API_URL}/api/auth/login`,
    REGISTER: `${API_URL}/api/auth/register`,
}

// Create Axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, // if using cookies for auth
    timeout: 10000, // optional: 10s timeout
  });
  
  // Request Interceptor (e.g., for attaching tokens if needed)
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {   
      const token = localStorage.getItem("accessToken"); // adjust based on your auth method
      if (token) {
            config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  // Response Interceptor (optional: global error handling)
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // handle global errors here if needed
      // e.g., if (error.response?.status === 401) { ... }
      return Promise.reject(error);
    }
  );
  
  export default api;

