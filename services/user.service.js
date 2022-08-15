const userRepository = require('../repositories/user.repository');
const { CONFLICT } = require('../util/statusCode');

module.exports.getById = ({ id }) => new Promise(async (resolve, reject) => {
    try {
        let user = await userRepository.getById(id);
        resolve({ user });
    } catch (err) {
        reject(err);
    }
})

module.exports.create = (user) => new Promise(async (resolve, reject) => {
    try {
        let isExistingUser = await userRepository.getByEmail(user.email);
        if (isExistingUser) return reject(CONFLICT);
        else {
            user = await userRepository.create(user);
            resolve(user);
        }
    } catch (err) {
        reject(err);
    }
})

module.exports.getAll = ({ department }) => new Promise(async (resolve, reject) => {
    try {
        let query = {};
        if (department) query.department = department;
        let users = await userRepository.getByQuery(query);
        resolve(users);
    } catch (err) {
        reject(err);
    }
})

module.exports.update = (user) => new Promise(async (resolve, reject) => {
    try {
        let userId = user._id
        delete user._id;
        user = await userRepository.updateByQuery({ _id: userId }, user);
        user = await userRepository.getById(userId);
        resolve({ user });
    } catch (err) {
        reject(err);
    }
})
