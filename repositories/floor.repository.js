const { Floor } = require('../models');

module.exports.getByQuery = (query = {}) => new Promise((resolve, reject) => {
    Floor.find(query)
        .then((floor) => {
            resolve(floor);
        })
        .catch((err) => {
            reject(err);
        })
})

module.exports.getById = (_id, forceField) => new Promise((resolve, reject) => {
    Floor.findOne({ _id }).select(forceField)
        .then((floor) => {
            resolve(floor);
        })
        .catch((err) => {
            reject(err);
        })
})

module.exports.create = (floor) => new Promise((resolve, reject) => {
    Floor.create(floor)
        .then((floor) => {
            resolve(floor);
        })
        .catch((err) => {
            reject(err);
        })
})

module.exports.update = (findQuery, updateQuery) => new Promise((resolve, reject) => {
    Floor.updateMany(findQuery, updateQuery)
        .then((floor) => {
            resolve(floor);
        })
        .catch((err) => {
            reject(err);
        })
})
