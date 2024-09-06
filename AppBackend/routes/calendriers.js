import express from "express";
import Calendrier from "../models/Calendrier.js";

const router = express.Router();

//ajouter une date au calendrier
router.post('/calendrier', async (req, res) => {
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
router.get('/calendrier', async (req, res) => {
  try {
    const calendrier = await Calendrier.find();
    res.status(200).json(calendrier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;