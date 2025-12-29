// model/member.js
import mongoose from "mongoose";
import crypto from "crypto";

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roll: { type: String, required: true, unique: true },
  email: { type: String, unique: true, sparse: true },
  blitzId: { type: String, unique: true },
  techDept: {
    type: [String],
    enum: [
      "Suspension, Steering and Braking",
      "Chassis and Aerodynamics",
      "Powertrain",
      "Electronics"
    ],
    default: []
  },
  nonTechDept: {
    type: [String],
    enum: [
      "Management",
      "Finance",
      "Logistics",
      "Documentation",
      "Business Plan Presentation",
      "Media"
    ],
    default: []
  },
  image: { type: String, required: true },
  linkedin: { type: String, default: "" },
  position: {
    type: String,
    enum: [
      "Senior Engineer",
      "Junior Engineer",
      "Apprentice Engineer",
      "Trainee"
    ],
    default: "Trainee"
  },
  createdAt: { type: Date, default: Date.now }
});

MemberSchema.pre("save", function () {
  if (!this.blitzId) {
    const randomHex = crypto.randomBytes(3).toString("hex").toUpperCase();
    this.blitzId = `MB-${randomHex}`;
  }
});

if (mongoose.models.MemberV3) {
  delete mongoose.models.MemberV3;
}

// Prevent "OverwriteModelError" on hot reload
export default mongoose.models.MemberV3 || mongoose.model("MemberV3", MemberSchema);