const seatRepository = require('../repositories/seat.repository');
const { moment } = require('../util');

module.exports.unblockSeat = () => new Promise(async (resolve, reject) => {
    try {
        const blockedSeats = await seatRepository.update({ blockedAt: { $lte: moment().subtract(5, 'minutes') } }, { $unset: { blockedAt: 1, blockedBy: 1 } });
        console.log(blockedSeats);
        resolve(blockedSeats)
    } catch (err) {
        reject(err);
    }
})