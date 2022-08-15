const { User } = require('../models');

module.exports.getByEmail = (email) => new Promise((resolve, reject) => {
    User.findOne({ email })
        .then((user) => {
            resolve(user);
        })
        .catch((err) => {
            reject(err);
        })
})

module.exports.create = (user) => new Promise((resolve, reject) => {
    User.create(user)
        .then((user) => {
            resolve(user);
        })
        .catch((err) => {
            reject(err);
        })
})

module.exports.getById = (_id) => new Promise((resolve, reject) => {
    User.findOne({ _id })
        .then((user) => {
            resolve(user);
        })
        .catch((err) => {
            reject(err);
        })
})

module.exports.getByQuery = (query = {}) => new Promise((resolve, reject) => {
    User.find(query)
        .then((users) => {
            resolve(users);
        })
        .catch((err) => {
            reject(err);
        })
})

module.exports.updateByQuery = (findQuery, updateQuery) => new Promise((resolve, reject) => {
    User.updateMany(findQuery, updateQuery)
        .then((user) => {
            resolve(user);
        })
        .catch((err) => {
            reject(err);
        })
})

module.exports.deleteById = (_id) => new Promise((resolve, reject) => {
    User.deleteOne({ _id })
        .then((user) => {
            resolve(user);
        })
        .catch((err) => {
            reject(err);
        })
})
