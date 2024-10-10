const mongoose = require('mongoose');

const newsEventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Stores the image path
    required: false, //  optional
  }
}, { timestamps: true });

const NewsEvent = mongoose.model('NewsEvent', newsEventSchema);

module.exports = NewsEvent;
