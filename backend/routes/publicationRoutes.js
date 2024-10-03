const express = require('express');
const router = express.Router();
const publicationController = require('../controllers/PublicationsController');

// Add a new publication under a category
router.post('/publication', publicationController.addPublication);

// Get all publications under a specific category
router.get('/publications/:categoryId', publicationController.getPublicationsByCategory);

module.exports = router;
