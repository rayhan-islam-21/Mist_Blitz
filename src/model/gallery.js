const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  // The direct link to the image
  imageUrl: { 
    type: String, 
    required: true 
  },
  year: { 
    type: String, 
    required: true,
    default: "2025"
  },

  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

module.exports = mongoose.model('Gallery', GallerySchema);