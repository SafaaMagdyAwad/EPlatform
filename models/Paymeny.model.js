import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    amount: Number,
    provider: { type: String, enum: ["stripe", "paymob"] },
    status: { type: String, enum: ["pending", "paid", "failed"] },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
