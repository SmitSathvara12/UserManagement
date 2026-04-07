import User from "../models/userModel.js";

export const getProfile = async (req,res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* GET ALL USERS */
export const getUsers = async (req,res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      users: users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* GET SINGLE USER */
export const getUserById = async (req,res) => {
  const user = await User.findById(req.body.id).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};

/* UPDATE USER */
export const updateUser = async (req,res) => {
  try {
    const user = await User.findById(req.body.id).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
    user.status = req.body.status || user.status;

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      updatedUser: updatedUser.toObject({ getters: true }),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* DELETE USER */
export const deleteUser = async (req,res) => {
  const user = await User.findById(req.body.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await user.deleteOne();

  res.json({ message: "User deleted" });
};
