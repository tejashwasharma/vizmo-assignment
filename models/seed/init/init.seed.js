const floorRepository = require('../../../repositories/floor.repository');
const departmentRepository = require('../../../repositories/department.repository');
const seatRepository = require('../../../repositories/seat.repository');
const userRepository = require('../../../repositories/user.repository');
const configRepository = require('../../../repositories/config.repository');
const initData = require('./data');

module.exports.initSeed = async () => {
    try {
        const isInitialSeeded = await configRepository.getConfigByKey('isInitialSeeded');
        if (!isInitialSeeded || (isInitialSeeded && !isInitialSeeded.value.value)) {
            initData.data = initData.floor.reduce((acc, f) => {
                const department = f.department.map(d => {
                    d.floor = f._id;
                    d.floor_acronym = f.acronym;
                    return d;
                });

                if (!acc.department) acc.department = [];
                acc.department = department.concat(acc.department);

                if (acc.floor) acc.floor.push(f);
                else acc.floor = [f];

                const seats = department.reduce((acc, d) => {
                    let seat = [...Array(d.totalSeats).keys()].reduce((acc, s, i) => {
                        acc.push({
                            acronym: `${d.floor_acronym}-${d.acronym}-${i > 8 ? '0' + (i + 1) : i + 1}`,
                            department: d._id,
                            index: i + 1
                        });
                        return acc;
                    }, []);
                    return [...acc, ...seat];
                }, [])

                if (!acc.seats) acc.seats = [];
                acc.seats = seats.concat(acc.seats);

                return acc;
            }, {})

            await floorRepository.create(initData.data.floor);
            await departmentRepository.create(initData.data.department);
            await seatRepository.create(initData.data.seats);
            await userRepository.create(initData.user);
            await configRepository.createKeyValue({ key: 'isInitialSeeded', value: { value: true } });
        }
    } catch (err) {
        console.error(err);
    }
}
