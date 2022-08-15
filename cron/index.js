const Cron = require('cron').CronJob;
const { unblockSeat } = require('./unblockSeat.cron');
const { cleanSeatsForNewDay } = require('./cleanSeatsForNewDay.cron');

// we need to create these cron jobs as different service, maybe using kubernetes so backend server doesn't get load

const unblockSeatCron = async () => {
    const Job = new Cron('* * * * *', async () => {
        try {
            await unblockSeat();
        } catch (err) {
            console.error(err);
        }
    }, null, true, 'Asia/Kolkata');

    Job.start();
};

const cleanSeatsForNewDayCron = async () => {
    const Job = new Cron('0 0 * * *', async () => {
        try {
            await cleanSeatsForNewDay();
        } catch (err) {
            console.error(err);
        }
    }, null, true, 'Asia/Kolkata');

    Job.start();
};

module.exports.initiatingCrons = async () => {
    await unblockSeatCron();
    await cleanSeatsForNewDayCron();
}