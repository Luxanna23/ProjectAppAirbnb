import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
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
  TotalPrice: {
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

const Reservation = mongoose.model('Reservation', ReservationSchema);
export default Reservation;