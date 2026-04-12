import mongoose from "mongoose";

const NoticeSchema = new mongoose.Schema({
  message: { type: String, required: true },
  link: { type: String, default: "" },
  linkText: { type: String, default: "Learn More" },
  type: {
    type: String,
    enum: ["info", "success", "warning"],
    default: "info",
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Notice || mongoose.model("Notice", NoticeSchema);
