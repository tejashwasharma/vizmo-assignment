const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: {
        type: String
    },
    acronym: {
        type: String,
        unique: true
    },
    floor: {
      type: mongoose.Schema.Types.ObjectId      // so department seating cna be grouped within a floor or same area
    },
    isActive: {
        type: Boolean,
        default: true
    },
    type: {
        type: String,
        default: 'department'
    }
}, { timestamps: true, collection: 'department' });
departmentSchema.index({ floor: 1 });

const Department = mongoose.model('Department', departmentSchema);
module.exports = Department;