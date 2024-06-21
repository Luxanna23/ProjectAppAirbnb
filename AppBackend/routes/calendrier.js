const express = require('express');
const router = express.Router();
const Calendrier = require('../models/Calendrier');

//ajouter une date au calendrier
router.post('/', async (req, res) => {
  const { startDate, endDate } = req.body;

  try {
    const newCalendrier = new Calendrier({ startDate, endDate });
    await newCalendrier.save();
    res.status(201).json(newCalendrier);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//obtenir tout le calendrier
router.get('/', async (req, res) => {
  try {
    const calendrier = await Calendrier.find();
    res.status(200).json(calendrier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;