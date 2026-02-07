import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: {
            type: String,
            required: true,
            minlength: [6, "Password must be at least 6 characters"],
        },
        role: {
            type: String,
            enum: ["student", "instructor", "admin"],
            default: "student",
        },
        isActive: { type: Boolean, default: true },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
    }, { timestamps: true });

// Hash password قبل الحفظ
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

// Instance method لمقارنة الباسورد
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel = mongoose.model("User", userSchema);
export default UserModel;

