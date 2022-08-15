const seatRepository = require('../repositories/seat.repository');

module.exports.cleanSeatsForNewDay = () => new Promise(async (resolve, reject) => {
    try {
        const blockedSeats = await seatRepository.update({}, { $unset: { blockedAt: 1, blockedBy: 1, bookedAt: 1 } });
        resolve(blockedSeats)
    } catch (err) {
        reject(err);
    }
})