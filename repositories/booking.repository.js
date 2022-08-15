const { Booking } = require('../models');

module.exports.getByQuery = (query = {}) => new Promise((resolve, reject) => {
    Booking.find(query)
        .then((bookings) => {
            resolve(bookings);
        })
        .catch((err) => {
            reject(err);
        })
})

module.exports.getById = (_id, forceField) => new Promise((resolve, reject) => {
    Booking.findOne({ _id }).select(forceField)
        .then((booking) => {
            resolve(booking);
        })
        .catch((err) => {
            reject(err);
        })
})

module.exports.create = (booking) => new Promise((resolve, reject) => {
    Booking.create(booking)
        .then((booking) => {
            resolve(booking);
        })
        .catch((err) => {
            reject(err);
        })
})

module.exports.update = (findQuery, updateQuery) => new Promise((resolve, reject) => {
    Booking.updateMany(findQuery, updateQuery)
        .then((booking) => {
            resolve(booking);
        })
        .catch((err) => {
            reject(err);
        })
})
