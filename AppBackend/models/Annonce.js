const mongoose = require('mongoose');

const AnnonceSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Adresse: {
    type: String,
    required: true
  },
  Price_per_night: {
    type: Number,
    required: true
  },
  id_calendrier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Calendrier',
    required: true
  },
  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Annonce = mongoose.model('Annonce', AnnonceSchema);

module.exports = Annonce;