import mongoose from "mongoose";

const TransitionLogSchema = new mongoose.Schema(
  {
    // The type of event: CHECKOUT or RETURN
    type: {
      type: String,
      required: true,
      enum: ["ACTIVE", "RETURN"],
    },
    
    // Link to the original equipment (for inventory tracking)
    equipmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Equipment",
      required: true,
    },

    // Snapshot of the Item at the time of the event
    item: {
      name: { type: String, required: true },
      productCode: { type: String, required: true },
      photo: { type: String },
    },

    // Snapshot of the User/Receiver
    receiver: {
      name: { type: String, required: true },
      blitzId: { type: String, required: true },
      photo: { type: String },
    },

    // Quantity involved in this specific transition
    quantity: {
      type: Number,
      required: true,
    },
  },
  { 
    timestamps: true // This automatically creates 'createdAt' which we use as the Event Timestamp
  }
);

// Prevent Next.js from recompiling the model on every hot reload
const TransitionLog = mongoose.models.TransitionLog || mongoose.model("TransitionLog", TransitionLogSchema);

export default TransitionLog;