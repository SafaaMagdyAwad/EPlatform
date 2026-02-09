import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";
import UserModel from "../models/User.model.js";
import { createHash, randomBytes } from "crypto";

/**
 * Generate JWT Token
 */
const generateToken = (id, role) => {
    return jwt.sign(
        { id, role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};
const generateRefreshToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};
/**
 * @desc    Register new User
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (role == "admin") {
            return res.status(403).json({
                "message": "Forbidden"
            })
        }
        // 1️⃣ Validation
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        // 2️⃣ Check if email exists
        const UserExists = await UserModel.findOne({ email });
        if (UserExists) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        // 3️⃣ Create User (password hashed via pre-save hook)
        const user = await UserModel.create({
            name,
            email,
            password,
            role,
        });

        // 4️⃣ Response
        res.status(201).json({
            message: "user registered successfully",
            token: generateToken(user._id, user.role),
            user
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

/**
 * @desc    Login User
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    // التحقق من البيانات
    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    const userSafe = user.toObject();
    delete userSafe.password;

    // توليد التوكنات
    const accessToken = generateToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id, user.role);

    // تخزين refresh token في HttpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 أيام
    });

    res.status(200).json({
      message: "Login successful",
      token: accessToken,
      user: userSafe
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Forgot password
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "Email is not connected to any account"
            });
        }

        const resetToken = randomBytes(32).toString("hex");

        user.resetPasswordToken = createHash("sha256")
            .update(resetToken)
            .digest("hex");

        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

        await user.save();

        const resetUrl = `${process.env.FRONT_URL}/reset-password/${resetToken}`;

        await sendEmail({
            to: user.email,
            subject: "اعد ضبط كلمة المرور",
            html: `
        <h2>اعاده ضبط كلمة المرور</h2>
        <p>اضغط على الرابط الموجود بالاسفل لاعاده تعيين كلمه المرور:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>سيتم تعطيل الرابط خلال 10 دقائق.</p>
      `
        });

        res.json({
            message: "If this email exists, a reset link has been sent",
            resetToken //will be removed 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


/**
 * @desc    Reset password
 * @route   POST /api/auth/reset-password/:token
 * @access  Public
 */
export const resetPassword = async (req, res) => {
    try {
        const { password } = req.body;

        if (!password || password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        const hashedToken = createHash("sha256")
            .update(req.params.token)
            .digest("hex");

        const user = await UserModel.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired token"
            });
        }

        // password will be hashed by pre-save hook
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({
            message: "Password reset successful"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
/**
 * @desc    Refresh
 * @route   POST /api/auth/refresh
 * @access  Public
 */
export const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: "No refresh token" });

    // تحقق من صحة الـ token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    // اصنع access token جديد
    const accessToken = generateToken(decoded.id, decoded.role);

    res.status(200).json({
      message: "Token refreshed",
      token: accessToken
    });

  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

/**
 * @desc    Logout
 * @route   POST /api/auth/logout
 * @access  
 */
export const logout = async (req, res) => {
  try {
    // لو استخدمتي cookie
    res.clearCookie("refreshToken", { httpOnly: true });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



