// model/member.js
import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roll: { type: String, required: true, unique: true },
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
      "Trainee",
      "Member",
      "Lead",
      "Sub-Lead",
      "Advisor"
    ],
    default: "Trainee"
  },
  createdAt: { type: Date, default: Date.now }
});

// Prevent "OverwriteModelError" on hot reload
export default mongoose.models.MemberV3 || mongoose.model("MemberV3", MemberSchema);
