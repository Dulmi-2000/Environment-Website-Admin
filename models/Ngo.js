// models/ngoModel.js

const mongoose = require('mongoose');

const ngoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  filePath: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const Ngo = mongoose.model('Ngo', ngoSchema);

module.exports = Ngo;
