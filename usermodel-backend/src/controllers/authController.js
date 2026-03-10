import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// REGISTER USER
export const createUser = async (req, res) => {
  const { name, email, password, role = "user" } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
    role
  });

  res.status(201).json({
    message: "User registered successfully",
    user,
  });
};

// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    if (user.status !== 'active') {
      return res.status(404).json({
        message: "User is inactive ,please contact to tour admin",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(res, user._id);

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
      token 
    });
  } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// LOGOUT USER
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("userToken");
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
