import {
  changeMyPassword,
  deleteMyProfile,
  getMyProfile,
  updateMyProfile,
} from "../services/user.service.js";

export const me = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await getMyProfile(userId);

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({
      message: error.message || "Server error",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const allowedUpdates = ["name", "email", "avatar"];
    const updates = {};

    allowedUpdates.forEach((key) => {
      if (req.body.hasOwnProperty(key)) updates[key] = req.body[key];
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    const user = await updateMyProfile(userId, updates);

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await deleteMyProfile(userId);

    res.status(200).json({
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({
      message: error.message || "Server error",
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    await changeMyPassword(userId, oldPassword, newPassword);

    res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({
      message: error.message || "Server error",
    });
  }
};
