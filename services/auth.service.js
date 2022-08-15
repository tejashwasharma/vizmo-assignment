const userRepository = require('../repositories/user.repository');
const { FORBIDDEN, NOT_FOUND } = require('../util/statusCode');
const { generateAccessToken } = require('../util');

module.exports.login = (credentials) => new Promise(async (resolve, reject) => {
    try {
        let user = await userRepository.getByEmail(credentials.email).catch(err => reject(err));
        if (user && user._id) {
            let isPasswordMatch = await user.comparePassword(credentials.password);
            if (isPasswordMatch) {
                user = user.toObject();
                delete user.password;
                user.token = `Bearer ${generateAccessToken(user._id)}`;
                resolve(user);
            } else {
                reject(FORBIDDEN);
            }
        } else {
            reject(NOT_FOUND);
        }
    } catch (err) {
        reject(err);
    }
});
