const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Publication schema
const publicationSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',  // Reference to Category model
    required: true
  },
  fileUrl: {
    type: String,  // Assuming the publication is a file with a URL
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Export Publication model
const Publication = mongoose.model('Publication', publicationSchema);
module.exports = Publication;
