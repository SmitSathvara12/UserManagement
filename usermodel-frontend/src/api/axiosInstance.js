import axios from "axios";
import { handelError } from "../utiles";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

//REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

//RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      // Unauthorized
      if (status === 401) {
        handelError("Session expired. Please login again.");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      // Forbidden
      if (status === 403) {
        handelError("You are not authorized for this action.");
      }
      // Server Error
      if (status === 500) {
        handelError("Server error. Try again later.");
      }
      return Promise.reject(error.response.data);
    }
    // Network Error
    handelError("Network error. Check internet connection.");

    return Promise.reject(error);
  },
);

export default axiosInstance;
