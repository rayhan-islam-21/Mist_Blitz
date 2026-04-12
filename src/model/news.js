import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  category: {
    type: String,
    enum: ["Competition", "Team Update", "Achievement", "Event", "Announcement"],
    default: "Announcement",
  },
  image: { type: String, default: "" },
  isPublished: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.News || mongoose.model("News", NewsSchema);
