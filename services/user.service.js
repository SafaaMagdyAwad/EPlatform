import UserModel from "../models/User.model.js";

export const getMyProfile = async (userId) => {
  try {
    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    return user;
  } catch (error) {
    throw error;
  }
};

export const updateMyProfile = async (userId, updates) => {
  try {
    const existingUser = await UserModel.findOne({ email: updates.email });
    if (existingUser && existingUser._id.toString() !== userId) {
      const error = new Error("Email is already in use");
      error.statusCode = 400;
      throw error;
    }
    const user = await UserModel.findByIdAndUpdate(
      userId,
      updates,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    if (user.email != updates.email) {
      const UserExists = await UserModel.findOne({ email });
      if (UserExists) {
        const error = new Error("Email linked to another account exists");
        error.statusCode = 409;
        throw error;
      }
    }
    return user;
  } catch (error) {
    throw error;
  }
};
export const deleteMyProfile = async (userId) => {
  try {
    const user = await UserModel.findByIdAndDelete(
      userId,
    )

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    return user;
  } catch (error) {
    throw error;
  }
};


export const changeMyPassword = async (userId, oldPassword, newPassword) => {
  try {
    if (!oldPassword || !newPassword) {
      const error = new Error("Old password and new password are required");
      error.statusCode = 400;
      throw error;
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      const error = new Error("Old password is incorrect");
      error.statusCode = 400;
      throw error;
    }

    if (oldPassword === newPassword) {
      const error = new Error("New password must be different from old password");
      error.statusCode = 400;
      throw error;
    }

    user.password = newPassword;
    await user.save();
  } catch (error) {
    throw error;
  }
};
