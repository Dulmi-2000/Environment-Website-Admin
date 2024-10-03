const Publication = require('../models/Publication');
const Category = require('../models/Category');

// Add a new publication under a category
exports.addPublication = async (req, res) => {
  try {
    const { title, description, categoryId, fileUrl } = req.body;
    
    // Find the category by ID
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const newPublication = new Publication({
      title,
      description,
      category: categoryId,
      fileUrl
    });

    await newPublication.save();
    res.status(201).json(newPublication);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all publications under a specific category
exports.getPublicationsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Find publications that belong to the specified category
    const publications = await Publication.find({ category: categoryId }).populate('category', 'name');
    
    if (!publications) {
      return res.status(404).json({ message: 'No publications found for this category' });
    }

    res.status(200).json(publications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
