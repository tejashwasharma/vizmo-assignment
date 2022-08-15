const jwt = require("jsonwebtoken");
const { getByQuery } = require("../repositories/user.repository");
const { sendAuthorizationError } = require("../util/error");
const { TOKEN_SECRET } = require('../config')[process.env.ENV || 'dev'];

module.exports.authorizationMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return sendAuthorizationError(res);

    jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
        if (err) return sendAuthorizationError(res);

        if (!req.body) req.body = {};
        req.body.authUser = decoded.username;

        next();
    });
}

module.exports.adminAuthorizaationMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return sendAuthorizationError(res);

    jwt.verify(token, TOKEN_SECRET, async (err, decoded) => {
        if (err) return sendAuthorizationError(res);

        if (!req.body) req.body = {};
        req.body.authUser = decoded.username;

        console.log(req.body);

        const user = await getByQuery({ _id: decoded.username });
        if (user[0].isAdmin) next();
        else return sendAuthorizationError(res);
    });
}
