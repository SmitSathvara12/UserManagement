import axiosInstance from "./axiosInstance";

// Register user
export const createUserAPI = (data) => axiosInstance.post("/auth/createUser", data);

// Login user
export const loginAPI = (data) => axiosInstance.post("/auth/login", data);

// Get logged-in user
export const getMeAPI = () => axiosInstance.get("/auth/profile");

// Logout 
export const logoutAPI = () => axiosInstance.post("/auth/logout");
