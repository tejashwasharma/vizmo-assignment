const express = require('express');
const router = express.Router();
const { authorizationMiddleware } = require('../middlewares');

const { authRouter } = require('./auth.route');
const { seatRouter } = require('./seat.route');

router.use('/auth', authRouter);

// authorization middlewares
router.use(authorizationMiddleware);
router.use('/seat', seatRouter);

module.exports = router;
