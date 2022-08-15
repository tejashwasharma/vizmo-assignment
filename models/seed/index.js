const { initSeed } = require('./init/init.seed');

module.exports.initiatingSeed = async () => {
    await initSeed();
}
