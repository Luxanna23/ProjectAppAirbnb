const express = require('express');
const router = express.Router();
const User = require('../models/User');

//pour register
router.post('/register', async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const newUser = new User({ firstname, lastname, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// pour se connecter
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).json({ error: 'Incorrect inputs' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;