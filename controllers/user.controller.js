const userService = require('../services/user.service');
const { sendErrorResponse, sendUserAlreadyExistsError, sendValidationError } = require('../util/error');
const { CONFLICT, UNPROCESSABLE_ENTITY } = require('../util/statusCode');

module.exports.getById = (req, res) => {
    userService.getById(req.params)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            sendErrorResponse(res, err);
        })
}

module.exports.create = (req, res) => {
    userService.create(req.body)
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        if (err === CONFLICT) sendUserAlreadyExistsError(res);
        else if (err === UNPROCESSABLE_ENTITY) sendValidationError(res);
        else sendErrorResponse(res, err);
    })
}

module.exports.getAll = (req, res) => {
    userService.getAll()
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        sendErrorResponse(res, err);
    })
}

module.exports.update = (req, res) => {
    userService.update(req.body)
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        sendErrorResponse(res, err);
    })
}

