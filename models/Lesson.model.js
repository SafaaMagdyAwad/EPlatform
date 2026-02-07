import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },
    type: {
      type: String,
      enum: ["video", "file", "live"],
      required: true,
    },
    title: { type: String, required: true },
    contentUrl: String,
    duration: Number,
    order: Number,
    isFreePreview: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Lesson", lessonSchema);
