const Category = require('../models/Category');

// Add a new category
exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    
    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const newCategory = new Category({ name });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Delete a category
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await Category.findByIdAndDelete(id);
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete category' });
  }
};


// Edit a category name
exports.editCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
      const category = await Category.findById(id);
      if (!category) {
          return res.status(404).json({ message: 'Category not found' });
      }

      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
          return res.status(400).json({ message: 'Category name already exists' });
      }

      category.name = name;
      await category.save();

      res.status(200).json({ message: 'Category updated successfully', category });
  } catch (err) {
      res.status(500).json({ message: 'Failed to update category', error: err.message });
  }
};



exports.deleteCategory = async (req, res) => {
  try {
      const categoryId = req.params.id; // Get the category ID from the request params

      // Find and delete the category
      const deletedCategory = await Category.findByIdAndDelete(categoryId);

      if (!deletedCategory) {
          return res.status(404).json({ message: 'Category not found' });
      }

      // Optionally, you can also delete publications associated with this category
      // await Publication.deleteMany({ categoryId: categoryId }); // Uncomment if you want to delete associated publications

      res.status(200).json({ message: 'Category deleted successfully', deletedCategory });
  } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).json({ message: 'Server error', error });
  }
};