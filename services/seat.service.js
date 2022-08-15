const seatRepository = require('../repositories/seat.repository');
const floorRepository = require('../repositories/floor.repository');
const departmentRepository = require('../repositories/department.repository');
const bookingRepository = require('../repositories/booking.repository');
const { moment } = require('../util');
const { UNPROCESSABLE_ENTITY } = require('../util/statusCode');

module.exports.getById = ({ id }) => new Promise(async (resolve, reject) => {
    try {
        const seat = await seatRepository.getById(id);
        const department = await departmentRepository.getByQuery({ _id: seat.department });
        const floor = await floorRepository.getByQuery({ _id: department.floor });
        resolve({ seat, floor, department });
    } catch (err) {
        reject(err);
    }
})

module.exports.getAll = () => new Promise(async (resolve, reject) => {
    try {
        const seat = await seatRepository.getByQuery();
        const department = await departmentRepository.getByQuery({ _id: { $in: seat.map(s => s.department) } });
        const floor = await floorRepository.getByQuery({ _id: { $in: department.map(d => d.floor) } });
        resolve({ seat, floor, department });
    } catch (err) {
        reject(err);
    }
})

module.exports.update = (seat) => new Promise(async (resolve, reject) => {
    try {
        const _id = seat._id;
        delete seat._id;
        seat = await seatRepository.update({ _id: _id }, seat);
        seat = await seatRepository.getById(_id);
        resolve(seat);
    } catch (err) {
        reject(err);
    }
})

module.exports.block = ({ _id, authUser }) => new Promise(async (resolve, reject) => {
    try {
        let seat = await seatRepository.getById(_id);
        if (!seat.blockedBy && !seat.blockedAt && !seat.bookedAt) {
            await seatRepository.update({ _id: _id }, { $set: { blockedAt: moment(), blockedBy: authUser } });
            seat = await seatRepository.getById(_id);
        } else {
            return reject(UNPROCESSABLE_ENTITY)
        }
        resolve(seat);
    } catch (err) {
        reject(err);
    }
})

module.exports.confirmBook = ({ _id, authUser }) => new Promise(async (resolve, reject) => {
    try {
        let booking, seat = await seatRepository.getById(_id);
        if (seat && seat.blockedBy == authUser) {
            booking = await bookingRepository.create({ seat: seat._id, acronym: seat.acronym, bookedFor: moment().startOf('day').add(1, 'days'), user: authUser })
            await seatRepository.update({ _id: _id }, { $set: { bookedAt: moment() }, $unset: { blockedAt: 1, blockedBy: 1 } });
        } else {
            return reject(UNPROCESSABLE_ENTITY);
        }
        resolve(booking);
    } catch (err) {
        reject(err);
    }
})
