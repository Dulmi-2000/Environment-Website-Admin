const Admin = require('../models/AdminModel');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profileImages');  // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Generate a unique filename
    }
});

const upload = multer({ storage });

// Registration Function
async function registerAdmin(req, res) {
    try {
        const { fullName, email, username, password, phone } = req.body;

        // Check if username or email already exists
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({
            fullName,
            email,
            username,
            password: hashedPassword,
            phone
        });

        // Save the new admin to the database
        await newAdmin.save();
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registering admin', error: error.message });
    }
}

// Login Function


async function loginAdmin(req, res) {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (passwordMatch) {
            const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
            return res.status(200).json({ token });
        } else {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}


// Verify token middleware
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'No token provided.' });
    }
    jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret', async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token.' });
        }
        req.user = await Admin.findById(decoded.id);
        if (!req.user) {
            return res.status(403).json({ message: 'User not found.' });
        }
        next();
    });
};

// Route to get the admin profile
const getAdminProfile = async (req, res) => {
    try {
        const admin = req.user;
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.status(200).json({
            display_name: admin.fullName,
            email: admin.email,
            role: admin.role,
            profile_picture: admin.profileImage || '../../Assets/profile.png'
        });
    } catch (error) {
        console.error('Error fetching admin profile:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update Admin Profile
const updateAdminProfile = async (req, res) => {
    try {
        const adminId = req.user._id;
        const { fullName, email, username, phone, profileName, profileImage } = req.body;

        const updateFields = {};
        if (fullName) updateFields.fullName = fullName;
        if (email) updateFields.email = email;
        if (username) updateFields.username = username;
        if (phone) updateFields.phone = phone;
        if (profileName) updateFields.profileName = profileName;
        if (profileImage) updateFields.profileImage = profileImage;

        const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updateFields, { new: true, runValidators: true }).select('-password');
        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.status(200).json(updatedAdmin);
    } catch (error) {
        console.error('Error updating admin profile:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    upload,
    registerAdmin,
    loginAdmin,
    verifyToken,
    updateAdminProfile,
    getAdminProfile
};
