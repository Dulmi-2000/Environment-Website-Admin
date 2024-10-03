const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoriesController');

// Add a new category
router.post('/category', categoryController.addCategory);

// Get all categories
router.get('/categories', categoryController.getCategories);

module.exports = router;
