const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require('../config')[process.env.ENV || 'dev'];

module.exports.authorizationMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);
        next();
    });
}