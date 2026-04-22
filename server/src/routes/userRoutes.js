import express from "express";
import protect, { isAdmin } from "../middleware/authMiddleware.js";
import { createUser } from "../controllers/authController.js";

import {
  getProfile,
  getUsers,
  updateUser,
  deleteUser,
  getUserById,
} from "../controllers/userController.js";

const router = express.Router();

// Admin only route to create user
router.post("/", protect, createUser);

// Get all users (admin only)
router.get("/", protect, getUsers);

// Update user (admin only)
router.post("/updateuser", protect, updateUser);

// Delete user (admin only)
router.post("/deleteuser", protect, deleteUser);

router.get("/profile", protect, getProfile);

router.post("/getuserbyid", protect, getUserById);

export default router;
