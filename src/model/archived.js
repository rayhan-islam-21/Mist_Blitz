import mongoose from "mongoose";

const LogisticsRecordSchema = new mongoose.Schema({
  // THE ASSET SOURCE (For database indexing)
  equipmentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Equipment", 
    required: true 
  },

  // THE ITEM (Snapshotted details so history remains accurate even if item is deleted)
  item: {
    name: { type: String, required: true },
    productCode: { type: String, required: true }, // The 'bash' code
    photo: { type: String },                       // Item Image URL
  },

  // QUANTITY TRANSFERRED
  quantity: { type: Number, required: true, min: 1 },

  // THE RECEIVER (The member getting the gear)
  receiver: {
    name: { type: String, required: true },
    blitzId: { type: String, required: true },     
    photo: { type: String }                        
  },



  createdAt: { type: Date, default: Date.now },
  returnedAt: { type: Date }, 
  
  // LOGISTICS STATUS
  status: { 
    type: String, 
    enum: ['ACTIVE', 'RETURNED', 'DAMAGED', 'LOST'], 
    default: 'ACTIVE' 
  },

}, { 
  timestamps: true 
});

// Indexing for faster history lookups
LogisticsRecordSchema.index({ "receiver.blitzId": 1 });
LogisticsRecordSchema.index({ status: 1 });

export const LogisticsRecord = mongoose.models.LogisticsRecord || mongoose.model("LogisticsRecord", LogisticsRecordSchema);