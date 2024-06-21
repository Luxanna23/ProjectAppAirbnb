const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

//pour créer une reservation
router.post('/', async (req, res) => {
  const { title, description, adresse, TotalPrice, id_calendrier, id_user } = req.body;

  try {
    const newReservation = new Reservation({ title, description, adresse, TotalPrice, id_calendrier, id_user });
    await newReservation.save();
    res.status(201).json(newReservation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//pour afficher toutes les reservations d'un user
router.get('/user/:userId', async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.params.userId }).populate('annonce').populate('id_calendrier');
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;