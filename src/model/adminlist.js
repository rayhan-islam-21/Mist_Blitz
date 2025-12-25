import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  uid: { type: String, required: true, unique: true },
  role: {
    type: String,
    default: "user",
  }
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
export default Admin;