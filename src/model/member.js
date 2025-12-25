import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    roll: { type: String, required: true, unique: true },
    dept: {
        type: String,
        enum: ["Powertrain", "Chassis", "Aerodynamics", "Documentation", "Management", "Media", "Non-Technical"],
        required: true
    },
    image: { type: String, required: true },
    linkedin: { type: String, default: "" },
    position: {
        type: String,
        enum: ["Member", "Lead", "Sub-Lead", "Advisor"],
        default: "Member"
    },
    createdAt: { type: Date, default: Date.now }
});

// 🔥 FORCE NEW MODEL
export default mongoose.model("MemberV2", MemberSchema);
