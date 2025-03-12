const express = require('express');
const { signup, login, logout } = require('../controllers/user.js'); // Import signup controller

const router = express.Router();

// POST /api/auth/signup - Signup route
router.post('/signup', signup);

// POST /api/auth/login - Login route
router.post('/login', login);

// POST /api/auth/logout - Logout route
router.post('/logout', logout);

module.exports = router;
