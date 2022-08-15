const departmentRepository = require('../repositories/department.repository');

module.exports.getById = ({ id }) => new Promise(async (resolve, reject) => {
    try {
        let department = await departmentRepository.getById(id);
        resolve(department);
    } catch (err) {
        reject(err);
    }
})

module.exports.getAll = () => new Promise(async (resolve, reject) => {
    try {
        let department = await departmentRepository.getByQuery();
        resolve(department);
    } catch (err) {
        reject(err);
    }
})

module.exports.update = (department) => new Promise(async (resolve, reject) => {
    try {
        const _id = department._id;
        delete department._id;
        department = await departmentRepository.update({ _id: _id }, department);
        department = await departmentRepository.getById(_id);
        resolve(department);
    } catch (err) {
        reject(err);
    }
})
