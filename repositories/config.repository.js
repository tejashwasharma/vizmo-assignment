const { Config } = require('../models');

module.exports.createKeyValue = (config) => new Promise((resolve, reject) => {
    Config.create(config)
        .then((config) => {
            resolve(config);
        })
        .catch((err) => {
            reject(err);
        })
})

module.exports.getConfigByKey = (key) => new Promise((resolve, reject) => {
    Config.findOne({ key })
        .then((config) => {
            resolve(config);
        })
        .catch((err) => {
            reject(err);
        })
})

module.exports.updateConfigByKey = (findQuery, updateQuery) => new Promise((resolve, reject) => {
    Config.updateMany(findQuery, updateQuery)
        .then((config) => {
            resolve(config);
        })
        .catch((err) => {
            reject(err);
        })
})
