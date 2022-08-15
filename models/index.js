const mongoose = require('mongoose');
require('dotenv').config();
const { MONGODB_URI } = require('../config')[process.env.ENV || 'dev'];

mongoose.connect(MONGODB_URI);
mongoose.set('debug', process.env.ENV === 'dev' ? true : false);
mongoose.Promise = global.Promise;

module.exports = {
    Config: require('./config.model'),
    Floor: require('./floor.model'),
    Booking: require('./booking.model'),
    User: require('./user.model'),
    Department: require('./department.model'),
    Seat: require('./seat.model'),
    mongoose: mongoose
};