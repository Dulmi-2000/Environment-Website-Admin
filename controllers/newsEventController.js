const multer = require('multer');
const path = require('path');
const NewsEvent = require('../models/NewsEvent');

// Ensure the uploads directory exists
const fs = require('fs');
const uploadsDir = 'uploads';

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Multer configuration for storing images in the 'uploads/' folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/; // Acceptable image types
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb('Error: File upload only supports the following filetypes - ' + filetypes);
  },
});

// handle creating a news/event
exports.createNewsEvent = [
  upload.single('image'), // Middleware for image upload
  async (req, res) => {
    try {
      const { title, content, date } = req.body;

      if (!title || !content || !date) {
        return res.status(400).json({ message: 'Title, content, and date are required.' });
      }

      const imagePath = req.file ? req.file.path : null; // Handle image path if file is uploaded

      const newsEvent = new NewsEvent({
        title,
        content,
        date,
        image: imagePath // Save the image path
      });

      
      const savedNewsEvent = await newsEvent.save();
      res.status(201).json({ message: 'News/Event added successfully', data: savedNewsEvent });
    } catch (error) {
      console.error('Error adding news/event:', error.message); // Log the error message
      res.status(500).json({ message: 'Error adding the news/event', error: error.message });
    }
  }
];

// Controller to handle fetching all news/events
exports.getNewsEvents = async (req, res) => {
  try {
    const newsEvents = await NewsEvent.find(); // Fetch all news/events from the database
    res.status(200).json(newsEvents);
  } catch (error) {
    console.error('Error fetching news/events:', error.message); // Log the error message
    res.status(500).json({ message: 'Error fetching news/events', error: error.message });
  }
};



// Controller to handle fetching a news/event by ID
exports.getNewsEventById = async (req, res) => {
  const { id } = req.params; // Get the ID from request parameters
  try {
    const newsEvent = await NewsEvent.findById(id); // Fetch the event by ID

    if (!newsEvent) {
      return res.status(404).json({ message: 'News/Event not found' });
    }

    res.status(200).json(newsEvent); // Return the found event
  } catch (error) {
    console.error('Error fetching news/event by ID:', error.message); // Log the error message
    res.status(500).json({ message: 'Error fetching the news/event', error: error.message });
  }
};



// Controller to handle updating a news/event by ID
exports.updateNewsEvent = [
  upload.single('image'), // Middleware for image upload (optional)
  async (req, res) => {
    const { id } = req.params; // Get the ID from request parameters
    const { title, content, date } = req.body; // Extract fields from the request body
    let imagePath;

    try {
      // Find the existing news/event by ID
      const newsEvent = await NewsEvent.findById(id);
      if (!newsEvent) {
        return res.status(404).json({ message: 'News/Event not found' });
      }

      // Update fields
      if (title) newsEvent.title = title;
      if (content) newsEvent.content = content;
      if (date) newsEvent.date = date;
      if (req.file) {
        imagePath = req.file.path; // Get new image path if uploaded
        newsEvent.image = imagePath; // Update image path
      }

      // Save the updated news/event
      const updatedNewsEvent = await newsEvent.save();
      res.status(200).json({ message: 'News/Event updated successfully', data: updatedNewsEvent });
    } catch (error) {
      console.error('Error updating news/event:', error.message); // Log the error message
      res.status(500).json({ message: 'Error updating the news/event', error: error.message });
    }
  }
];



// Controller to handle deleting a news/event by ID
exports.deleteNewsEvent = async (req, res) => {
  const { id } = req.params; // Get the ID from request parameters
  try {
    const newsEvent = await NewsEvent.findByIdAndDelete(id); // Find and delete the event by ID

    if (!newsEvent) {
      return res.status(404).json({ message: 'News/Event not found' });
    }

    res.status(200).json({ message: 'News/Event deleted successfully' }); // Return success message
  } catch (error) {
    console.error('Error deleting news/event:', error.message); // Log the error message
    res.status(500).json({ message: 'Error deleting the news/event', error: error.message });
  }
};
