const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Category schema
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Export Category model
const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
