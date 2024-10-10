const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoriesController');

// Add a new category
router.post('/category', categoryController.addCategory);

// Get all categories
router.get('/categories', categoryController.getCategories);


// DELETE a category by id
router.delete('/categories/:id', categoryController.deleteCategory); // Delete a publication by ID

// Route to edit a category by ID
router.put('/categories/:id', categoryController.editCategory);


module.exports = router;
