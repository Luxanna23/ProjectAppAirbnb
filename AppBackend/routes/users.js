const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { check, validationResult } = require('express-validator');

//pour register
router.post('/register', [
  check('firstname').not().isEmpty().withMessage('Le champs prenom est requis'),
  check('lastname').not().isEmpty().withMessage('Le champs nom est requis'),
  check('email').isEmail().withMessage("L'email n'est pas valide"),
  check('password').isLength({ min: 3 }).withMessage('Le mot de passe doit faire minimum 3 caracteres')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
      return res.status(400).json({ error: 'Email ou mot de passe incorrectes' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;