
import mongoose from "mongoose";

const InviteTokenSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true,
            index: true
        },

        used: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
);


export default mongoose.models.InviteToken ||
    mongoose.model("InviteToken", InviteTokenSchema);
