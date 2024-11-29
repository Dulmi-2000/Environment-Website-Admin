// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController= require('../controllers/adminController');

router.post('/register', adminController.upload.single('profileImage'), adminController.registerAdmin);

router.post('/login', adminController.loginAdmin);

// Route for getting admin profile
router.get('/profile', adminController.verifyToken, adminController.getAdminProfile);

// Route for updating admin profile
router.put('/profile/:id', adminController.verifyToken, adminController.updateProfile);

router.get('/admin/:id', adminController.verifyToken, adminController.getAdminById);

module.exports = router;
