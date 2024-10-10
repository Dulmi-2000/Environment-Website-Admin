const Admin = require('../models/AdminModel');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');

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

// Register new admin

// Registration function
const registerAdmin = async (req, res) => {
    const { username, password, fullName, email, phone } = req.body;

    const normalizedUsername = username.trim().toLowerCase();
    const normalizedPassword = password.trim();

    try {
        const existingAdmin = await Admin.findOne({ username: normalizedUsername });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash(normalizedPassword, 10);
        console.log("Hashed password:", hashedPassword);

        const newAdmin = new Admin({
            username: normalizedUsername,
            password: hashedPassword,
            fullName,
            email,
            phone,
        });

        await newAdmin.save();
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        console.error("Error registering admin:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login function

const loginAdmin = async (req, res) => {
    const username = req.body.username.trim().toLowerCase();
    const password = req.body.password.trim();

    try {
        console.log("Login attempt with username:", username);

        const admin = await Admin.findOne({ username });
        if (!admin) {
            console.log("Admin not found");
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        console.log("Admin found:", admin);
        console.log("Hashed password from DB:", admin.password);

        // Compare the password
        const isMatch = await bcrypt.compare(password, admin.password);
        console.log("Plain password:", password);
        console.log("Password match result:", isMatch); // Log the result of comparison

        if (!isMatch) {
            console.log("Password does not match for username:", username);
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Create JWT token
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(200).json({
            message: 'Login successful',
            token,
            admin: {
                fullName: admin.fullName,
                email: admin.email,
                username: admin.username,
                phone: admin.phone,
            },
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: 'Server error' });
    }
};







const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from headers
    if (!token) {
        console.log("No token provided");
        return res.status(403).json({ message: 'No token provided.' });
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            console.log("Failed to authenticate token:", err);
            return res.status(403).json({ message: 'Failed to authenticate token.' });
        }
        req.user = await Admin.findById(decoded.id); // Ensure 'id' is correct
        if (!req.user) {
            console.log("User not found in DB");
            return res.status(403).json({ message: 'User not found.' });
        }
        next();
    });
};

 
 // Route to get the admin profile
 const getAdminProfile = async (req, res) => {
    try {
        const admin = req.user; // Use the user set in the verifyToken middleware
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.status(200).json({
            display_name: admin.fullName,
            email: admin.email,
            role: admin.role, // Make sure your Admin model has a role field
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
        const adminId = req.user._id; // Assuming you're using JWT to get the admin ID
        const { fullName, email, username, phone, profileName, profileImage } = req.body;

        // Create an object to hold the update fields
        const updateFields = {};

        if (fullName) updateFields.fullName = fullName;
        if (email) updateFields.email = email;
        if (username) updateFields.username = username;
        if (phone) updateFields.phone = phone;
        if (profileName) updateFields.profileName = profileName;
        if (profileImage) updateFields.profileImage = profileImage;

        // Update admin profile
        const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updateFields, { new: true, runValidators: true }).select('-password');
        
        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        
        res.status(200).json(updatedAdmin);
    } catch (error) {
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
