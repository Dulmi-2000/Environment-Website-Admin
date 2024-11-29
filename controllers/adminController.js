const Admin = require('../models/AdminModel');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profileImages');  
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage });

// Registration Function
async function registerAdmin(req, res) {
    try {
        const { fullName, email, username, password, phone } = req.body;

        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({
            fullName,
            email,
            username,
            password: hashedPassword,
            phone
        });

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
            id: admin._id, 
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
const mongoose = require('mongoose'); // Import mongoose

const updateProfile = async (req, res) => {
    try {
        const adminId = req.params.id;

        // Check if adminId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(adminId)) {
            return res.status(400).json({ message: 'Invalid admin ID format' });
        }

        console.log('Admin ID:', adminId);
        console.log('Incoming data:', req.body);
        console.log('Received data:', req.body); // Check if form data is parsed correctly
        console.log('Received file:', req.file);
        // Handle file uploads if using multer
        const { fullName, email, username, phone } = req.body;
        const profileImage = req.file ? req.file.path : undefined;

        const updateFields = {};
        if (fullName) updateFields.display_name = fullName;
        if (email) updateFields.email = email;
        if (username) updateFields.username = username;
        if (phone) updateFields.phone = phone;
        if (profileImage) updateFields.profile_picture = profileImage;

        // Validate if the username already exists (optional)
        if (username) {
            const existingUser = await Admin.findOne({ username });
            if (existingUser && existingUser._id.toString() !== adminId) {
                return res.status(400).json({ message: 'Username is already taken' });
            }
        }

        // Update the admin profile
        const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updateFields, { new: true, runValidators: true }).select('-password');

        if (!updatedAdmin) {
            console.error('Admin not found for ID:', adminId);
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.status(200).json(updatedAdmin);
    } catch (error) {
        console.error('Error updating admin profile:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { updateProfile };





async function getAdminById(adminId) {
    if (!mongoose.Types.ObjectId.isValid(adminId)) {
        console.log('Invalid Admin ID format.');
        return { error: 'Invalid Admin ID format.' };
    }

    try {
        const admin = await Admin.findById(adminId);
        if (!admin) {
            console.log(`Admin not found for ID: ${adminId}`);
            return { error: 'Admin not found' };
        }
        console.log(`Admin found: ${admin}`);
        return admin;
    } catch (error) {
        console.error('Error fetching admin by ID:', error);
        return { error: 'Database error' };
    }
}




module.exports = {
    upload,
    registerAdmin,
    loginAdmin,
    verifyToken,
    updateProfile,
    getAdminProfile,
    getAdminById
};
