const mongoose = require('mongoose');
require('dotenv').config();
const { MONGODB_URI } = require('../config')[process.env.ENV || 'dev'];

mongoose.connect(MONGODB_URI);
mongoose.set('debug', true);
mongoose.Promise = global.Promise;

module.exports = {
    mongoose: mongoose
};