import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    roll: {
        type: String,
        required: [true, "Student ID/Roll is required"],
        unique: true
    },
    dept: {
        type: String,
        required: true,
        enum: ["Powertrain", "Chassis", "Aerodynamics", "Documentation", "Management", "Media", "Non-Technical"]
    },
    image: {
        type: String,
        required: [true, "Profile image is required"]
    },
    linkedin: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.Member || mongoose.model("Member", MemberSchema);