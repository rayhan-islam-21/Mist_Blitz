import mongoose from "mongoose";

const LogisticsRecordSchema = new mongoose.Schema({
  // THE ITEM (WHAT)
  item: {
    name: { type: String, required: true },
    productCode: { type: String, required: true }, // Your 'bash' ID
    photo: { type: String },                       // Item Image URL
    quantity: { type: Number, required: true }
  },

  // THE PERSON (WHO)
  receiver: {
    name: { type: String, required: true },
    blitzId: { type: String, required: true },     // The Member's unique ID
    photo: { type: String }                        // The Member's Profile Image
  },

  // THE TIME (WHEN)
  date: { type: Date, default: Date.now },
  
  // Status to differentiate Handouts vs History
  status: { type: String, enum: ['ACTIVE', 'RETURNED'], default: 'ACTIVE' }
});

export const LogisticsRecord = mongoose.models.LogisticsRecord || mongoose.model("LogisticsRecord", LogisticsRecordSchema);