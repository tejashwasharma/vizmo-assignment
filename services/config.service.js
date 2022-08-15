const configRepository = require('../repositories/config.repository');

module.exports.getKeyValue = ({ key }) => new Promise(async (resolve, reject) => {
    try {
        let config = await configRepository.getConfigByKey(key);
        resolve(config);
    } catch (err) {
        reject(err);
    }
})

module.exports.createKeyValue = (config) => new Promise(async (resolve, reject) => {
    try {
        config = await configRepository.createKeyValue(config);
        resolve(config);
    } catch (err) {
        reject(err);
    }
})

module.exports.updateKeyValue = (config) => new Promise(async (resolve, reject) => {
    try {
        config = await configRepository.updateConfigByKey({ key: config.key }, { value: config.value });
        resolve(config);
    } catch (err) {
        reject(err);
    }
})
