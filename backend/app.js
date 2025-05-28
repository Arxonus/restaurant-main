// backend/app.js

const express = require('express');
const cors = require('cors');

// Import Routes
const userRoutes = require('./routes/userRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/bookings', reservationRoutes);

// Default Route (για έλεγχο αν τρέχει το API)
app.get('/', (req, res) => {
  res.send('Reservation API is running!');
});

// Server Port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
