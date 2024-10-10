const express = require('express');
const multer = require('multer');
const mediaController = require('../controllers/mediaController');

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// Routes
router.post('/upload', upload.single('images'), mediaController.uploadImage);
router.get('/images', mediaController.getImages);

// DELETE route for deleting a media item by ID
router.delete('/images/:id', mediaController.deleteMedia); // Update this line


module.exports = router;
