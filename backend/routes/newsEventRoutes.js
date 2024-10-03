const express = require('express');
const router = express.Router();
const newsEventController = require('../controllers/newsEventController');


router.post('/news', newsEventController.createNewsEvent);
router.post('/event', newsEventController.createNewsEvent);

// Route for getting all news/events
router.get('/', newsEventController.getNewsEvents);

// Route to update a news/event by ID
router.put('/events/:id', newsEventController.updateNewsEvent);

router.get('/events/:id', newsEventController.getNewsEventById);

// Route for deleting a news/event by ID
router.delete('/events/:id', newsEventController.deleteNewsEvent);

module.exports = router;
