const mongoose = require('mongoose');

const floorSchema = new mongoose.Schema({
    name: {
        type: String
    },
    acronym: {
        type: String,
        unique: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    type: {
        type: String,
        default: 'floor'
    }
}, { timestamps: true, collection: 'floor' });

const Floor = mongoose.model('Floor', floorSchema);
module.exports = Floor;