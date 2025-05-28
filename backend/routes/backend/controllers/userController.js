// controllers/userController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);

        db.query('INSERT INTO tbl_users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err, result) => {
            if (err) return res.status(500).json({ message: 'Error creating user' });
            res.status(201).json({ message: 'User created successfully' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Login
exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM tbl_users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Error' });

        if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
};

// User Reservations
exports.getUserReservations = (req, res) => {
    const userId = req.user.userId;

    db.query('SELECT * FROM tbl_reservations WHERE user_id = ?', [userId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching reservations' });
        res.json(results);
    });
};

// Restaurants list
exports.getAllRestaurants = (req, res) => {
    db.query('SELECT * FROM tbl_restaurants', (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching restaurants' });
        res.json(results);
    });
};

// Create Reservation
exports.createReservation = (req, res) => {
    const { restaurantId, date, time, guests } = req.body;
    const userId = req.user.userId;

    db.query('INSERT INTO tbl_reservations (user_id, restaurant_id, date, time, guests) VALUES (?, ?, ?, ?, ?)', [userId, restaurantId, date, time, guests], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error creating reservation' });
        res.status(201).json({ message: 'Reservation created' });
    });
};
