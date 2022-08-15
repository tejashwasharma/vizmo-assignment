const bookingService = require('../services/booking.service');
const { sendErrorResponse, sendUserAlreadyExistsError, sendValidationError } = require('../util/error');
const { CONFLICT, UNPROCESSABLE_ENTITY } = require('../util/statusCode');

module.exports.getById = (req, res) => {
    bookingService.getById(req.params)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            sendErrorResponse(res, err);
        })
}

module.exports.create = (req, res) => {
    bookingService.create(req.body)
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
    bookingService.getAll()
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        sendErrorResponse(res, err);
    })
}

module.exports.update = (req, res) => {
    bookingService.update(req.body)
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        sendErrorResponse(res, err);
    })
}
