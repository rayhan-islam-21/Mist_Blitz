import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    ownerType: {
      type: String,
      required: true,
      enum: ["Blitz Official Inventory", "Private Member Owned"],
    },

    memberName: {
      type: String,
      default: null,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      required: true,
      enum: ["Electronics", "Mechanical", "Optics", "Tools", "Safety Gear"],
    },

    bash: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    image: {
      type: String, // Cloudinary URL
      default: null,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Prevent model overwrite in Next.js hot reload
export default mongoose.models.Equipment ||
  mongoose.model("Equipment", equipmentSchema);
