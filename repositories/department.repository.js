const { Department } = require('../models');

module.exports.getByQuery = (query = {}) => new Promise((resolve, reject) => {
    Department.find(query)
        .then((departments) => {
            resolve(departments);
        })
        .catch((err) => {
            reject(err);
        })
})

module.exports.getById = (_id, forceField) => new Promise((resolve, reject) => {
    Department.findOne({ _id }).select(forceField)
        .then((department) => {
            resolve(department);
        })
        .catch((err) => {
            reject(err);
        })
})

module.exports.create = (department) => new Promise((resolve, reject) => {
    Department.create(department)
        .then((department) => {
            resolve(department);
        })
        .catch((err) => {
            reject(err);
        })
})

module.exports.update = (findQuery, updateQuery) => new Promise((resolve, reject) => {
    Department.updateMany(findQuery, updateQuery)
        .then((department) => {
            resolve(department);
        })
        .catch((err) => {
            reject(err);
        })
})
