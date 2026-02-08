import UserModel from "../models/User.model.js";

export const getMyProfile = async (userId) => {
  const user = await UserModel.findById(userId).select("-password");

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

export const updateMyProfile = async (userId, updates) => {
  try {
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

    return user;
  } catch (error) {
    if (error.code === 11000) {
      const err = new Error("Email already exists");
      err.statusCode = 409;
      throw err;
    }
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
};
