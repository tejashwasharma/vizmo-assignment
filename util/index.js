const moment = require('moment-timezone');
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require('../config')[process.env.ENV || 'dev'];

module.exports.moment = (date) => {
    if (!date) return moment().tz('Asia/Kolkata');
    return moment(date).tz('Asia/Kolkata');
}

module.exports.generateAccessToken = (username) => jwt.sign({ username }, TOKEN_SECRET, {});
