import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  year: { type: String, default: "2025" },
}, { 
  timestamps: true,
  collection: 'galleries' // This forces Mongoose to use your existing collection
});

// The check for mongoose.models is still required for Next.js
const Gallery = mongoose.models.Gallery || mongoose.model("Gallery", GallerySchema);

export default Gallery;