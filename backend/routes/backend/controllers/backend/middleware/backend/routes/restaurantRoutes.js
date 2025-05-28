const express = require('express');
const router = express.Router();
const db = require('../services/db');

router.get('/', async (req, res) => {
  const [restaurants] = await db.query("SELECT * FROM restaurants");
  res.send(restaurants);
});

module.exports = router;
