const bookingRepository = require('../repositories/booking.repository');

module.exports.getById = ({ id }) => new Promise(async (resolve, reject) => {
    try {
        let booking = await bookingRepository.getById(id);
        resolve(booking);
    } catch (err) {
        reject(err);
    }
})

module.exports.getAll = () => new Promise(async (resolve, reject) => {
    try {
        let booking = await bookingRepository.getByQuery();
        resolve(booking);
    } catch (err) {
        reject(err);
    }
})

module.exports.create = (booking) => new Promise(async (resolve, reject) => {
    try {
        booking = await bookingRepository.create(booking);
        resolve(booking);
    } catch (err) {
        reject(err);
    }
})

module.exports.update = (booking) => new Promise(async (resolve, reject) => {
    try {
        const _id = booking._id;
        delete booking._id;
        booking = await bookingRepository.update({ _id: _id }, booking);
        booking = await bookingRepository.getById(_id);
        resolve(booking);
    } catch (err) {
        reject(err);
    }
})
