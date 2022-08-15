const floorRepository = require('../repositories/floor.repository');

module.exports.getById = ({ id }) => new Promise(async (resolve, reject) => {
    try {
        let floor = await floorRepository.getById(id);
        resolve(floor);
    } catch (err) {
        reject(err);
    }
})

module.exports.getAll = () => new Promise(async (resolve, reject) => {
    try {
        let floor = await floorRepository.getByQuery();
        resolve(floor);
    } catch (err) {
        reject(err);
    }
})

module.exports.update = (floor) => new Promise(async (resolve, reject) => {
    try {
        const _id = floor._id;
        delete floor._id;
        floor = await floorRepository.update({ _id: _id }, floor);
        floor = await floorRepository.getById(_id);
        resolve(floor);
    } catch (err) {
        reject(err);
    }
})
