import mongoose from "mongoose";

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
export default Calendrier;