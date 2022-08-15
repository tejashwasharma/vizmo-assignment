const { Seat } = require('../models');

module.exports.getByQuery = (query = {}) => new Promise((resolve, reject) => {
    Seat.find(query)
        .then((seat) => {
            resolve(seat);
        })
        .catch((err) => {
            reject(err);
        })
})

module.exports.getById = (_id, forceField) => new Promise((resolve, reject) => {
    Seat.findOne({ _id }).select(forceField)
        .then((seat) => {
            resolve(seat);
        })
        .catch((err) => {
            reject(err);
        })
})

module.exports.create = (seat) => new Promise((resolve, reject) => {
    Seat.create(seat)
        .then((seat) => {
            resolve(seat);
        })
        .catch((err) => {
            reject(err);
        })
})

module.exports.update = (findQuery, updateQuery) => new Promise((resolve, reject) => {
    Seat.updateMany(findQuery, updateQuery)
        .then((seat) => {
            resolve(seat);
        })
        .catch((err) => {
            reject(err);
        })
})
