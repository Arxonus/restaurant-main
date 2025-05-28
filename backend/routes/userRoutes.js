// backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserReservations } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Register user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// Get user reservations (protected)
router.get('/user/reservations', authMiddleware, getUserReservations);

module.exports = router;
