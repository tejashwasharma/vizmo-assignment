const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user.controller');
const { adminAuthorizaationMiddleware } = require('../middlewares');

userRouter.get('/:id', userController.getById);
userRouter.get('/', userController.getAll);
userRouter.post('/', adminAuthorizaationMiddleware, userController.create);
userRouter.patch('/', userController.update);

module.exports.userRouter = userRouter;