const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  }
});

// Virtual field for category name
publicationSchema.virtual('categoryName', {
  ref: 'Category', // The model to use
  localField: 'category', // Find category where `localField` (publication's category) is equal to `foreignField`
  foreignField: '_id', // The field from the category collection
  justOne: true // Only need one category (since it's a reference)
});

// Ensure virtual fields are included when converting to JSON
publicationSchema.set('toObject', { virtuals: true });
publicationSchema.set('toJSON', { virtuals: true });

const Publication = mongoose.model('Publication', publicationSchema);

module.exports = Publication;
