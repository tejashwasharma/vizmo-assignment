const express = require('express');
const router = express.Router();
const { authorizationMiddleware } = require('../middlewares');

const { authRouter } = require('./auth.route');
const { seatRouter } = require('./seat.route');
const { bookingRouter } = require('./booking.route');
const { userRouter } = require('./user.route');

router.use('/auth', authRouter);

// authorization middlewares
router.use(authorizationMiddleware);
router.use('/seat', seatRouter);
router.use('/booking', bookingRouter);
router.use('/user', userRouter);

// can create more routes like /floor, /department to get, create and update them

module.exports = router;
