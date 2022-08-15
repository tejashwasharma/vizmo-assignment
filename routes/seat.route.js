const express = require('express');
const seatRouter = express.Router();
const seatController = require('../controllers/seat.controller');

seatRouter.get('/:id', seatController.getById);
seatRouter.get('/', seatController.getAll);
seatRouter.patch('/', seatController.update);
seatRouter.patch('/block', seatController.block);
seatRouter.patch('/confirm-book', seatController.confirmBook);

module.exports.seatRouter = seatRouter;