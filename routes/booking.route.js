const express = require('express');
const bookingRouter = express.Router();
const bookingController = require('../controllers/booking.controller');

bookingRouter.get('/:id', bookingController.getById);
bookingRouter.get('/', bookingController.getAll);
bookingRouter.post('/', bookingController.create);
bookingRouter.patch('/', bookingController.update);

module.exports.bookingRouter = bookingRouter;