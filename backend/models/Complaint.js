const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  incidentLocation: { type: String, required: true },
  contactMethod: { type: String, required: true },
  consent: { type: Boolean, required: true },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
