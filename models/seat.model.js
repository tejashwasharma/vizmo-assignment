const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  index: {
    type: Number
  },
  acronym: {
    type: String,
    unique: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId    // so seat can be assosiated within a departmetn ehich is already assosiated with a floor
  },
  blockedAt: {
    type: Date,
  },
  bookedAt: {
    type: Date,
  },
  blockedBy: {
    type: mongoose.Schema.Types.ObjectId,
  },
  isActive: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: 'seat'
  }
}, { timestamps: true, collection: 'seat' });
seatSchema.index({ department: 1 });

const Seat = mongoose.model('Seat', seatSchema);
module.exports = Seat;
