const express = require("express");
const router = express.Router();
const Annonce = require("../models/Annonce");

//pour créer une annonce
router.post("/", async (req, res) => {
  const {
    title,
    description,
    adresse,
    imageUrl,
    Price_per_night,
    id_calendrier,
    id_user,
  } = req.body;

  try {
    const newAnnonce = new Annonce({
      title,
      description,
      adresse,
      imageUrl,
      Price_per_night,
      id_calendrier,
      id_user,
    });
    await newAnnonce.save();
    res.status(201).json(newAnnonce);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//pour charger une annonces
router.get("/api/annonces/:id", async (req, res) => {
  try {
    const annonces = await Annonce.findById(req.params.id)
      .populate("id_user")
      .populate("id_calendrier");
    res.status(200).json(annonces);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
