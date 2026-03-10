import axiosInstance from "./axiosInstance";

// Get all users (with pagination)
export const getUsersAPI = (params) => axiosInstance.get("/users", { params });

// Get single user
export const getUserByIdAPI = (id) => axiosInstance.post("/users/getuserbyid", { id });

// Update user
export const updateUserAPI = (id, data) => axiosInstance.post("/users/updateuser", { id, ...data });

// Delete user
export const deleteUserAPI = (id) => axiosInstance.post("/users/deleteuser", { id });
