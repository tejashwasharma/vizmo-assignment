const seatService = require('../services/seat.service');
const { sendErrorResponse } = require('../util/error');

module.exports.getById = (req, res) => {
    seatService.getById(req.params)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            console.log(err);
            sendErrorResponse(res, err);
        })
}

module.exports.getAll = (req, res) => {
    seatService.getAll()
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        sendErrorResponse(res, err);
    })
}

module.exports.update = (req, res) => {
    seatService.update(req.body)
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        sendErrorResponse(res, err);
    })
}

module.exports.block = (req, res) => {
    seatService.block(req.body)
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        sendErrorResponse(res, err);
    })
}

module.exports.confirmBook = (req, res) => {
    seatService.confirmBook(req.body)
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        sendErrorResponse(res, err);
    })
}
