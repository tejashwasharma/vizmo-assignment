const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId
  },
  seat: {
    type: mongoose.Schema.Types.ObjectId
  },
  acronym: {
    type: String
  },
  bookedFor: {
    type: Date
  },
  cancelledAt: {
    type: Date    // set only incase booking is cancelled
  },
  type: {
    type: String,
    default: 'booking'
  }
}, { timestamps: true, collection: 'booking' });

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;