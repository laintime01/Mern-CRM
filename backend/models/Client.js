const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  wixId: {
    type: String,
    unique: true,
    sparse: true,  // This allows the field to be optional
    index: true    // This improves query performance for this field
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Client', ClientSchema);