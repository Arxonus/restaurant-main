// Δημιουργία router για κράτηση τραπεζιού
const express = require('express');
const router = express.Router();
const db = require('../services/db');
const authMiddleware = require('../middleware/auth');

//  Προστασία routes με authentication middleware
//  Δημιουργία νέας κράτησης
router.post('/', authMiddleware, async (req, res) => {
  const { restaurant_id, date, time, people_count } = req.body;
  const user_id = req.user.id;

  try {
    await db.query(
      `INSERT INTO reservations (user_id, restaurant_id, date, time, people_count) 
       VALUES (?, ?, ?, ?, ?)`,
      [user_id, restaurant_id, date, time, people_count]
    );
    res.status(201).json({ message: "✅ Η κράτηση σας καταχωρήθηκε με επιτυχία!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "❌ Σφάλμα κατά την καταχώρηση κράτησης. Προσπαθήστε ξανά." });
  }
});

// 🔄 Ενημέρωση υπάρχουσας κράτησης
router.put('/:id', authMiddleware, async (req, res) => {
  const { date, time, people_count } = req.body;
  const user_id = req.user.id;
  const reservation_id = req.params.id;

  try {
    await db.query(
      `UPDATE reservations 
       SET date = ?, time = ?, people_count = ?
       WHERE reservation_id = ? AND user_id = ?`,
      [date, time, people_count, reservation_id, user_id]
    );
    res.json({ message: "✅ Η κράτηση ενημερώθηκε επιτυχώς." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "❌ Σφάλμα κατά την ενημέρωση της κράτησης." });
  }
});

// ❌ Διαγραφή κράτησης
router.delete('/:id', authMiddleware, async (req, res) => {
  const user_id = req.user.id;
  const reservation_id = req.params.id;

  try {
    await db.query(
      `DELETE FROM reservations WHERE reservation_id = ? AND user_id = ?`,
      [reservation_id, user_id]
    );
    res.json({ message: "✅ Η κράτηση διαγράφηκε επιτυχώς." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "❌ Σφάλμα κατά τη διαγραφή της κράτησης." });
  }
});

module.exports = router;
