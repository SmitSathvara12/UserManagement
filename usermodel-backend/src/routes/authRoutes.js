import express from "express";
import { loginUser, logoutUser, createUser } from "../controllers/authController.js";

import validate from "../middleware/validateMiddleware.js";
import { registerSchema, loginSchema } from "../validators/authValidation.js";

const router = express.Router();

router.post("/createUser", validate(registerSchema), createUser);

router.post("/login", validate(loginSchema), loginUser);

router.post("/logout", logoutUser);

export default router;