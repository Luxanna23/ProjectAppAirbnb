const mongoose = require('mongoose');

const CalendrierSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
});

const Calendrier = mongoose.model('Calendrier', CalendrierSchema);

module.exports = Calendrier;