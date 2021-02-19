const express = require('express');
/**
 * Controllers (route handlers).
 */
const userController = require('../src/controllers/user.controller');
const { isAuth } = require('../src/middleware/auth.middleware');
const validate = require('../src/middleware/validate.middleware');
const userValidation = require('../src/validations/user.validation');

const router = express.Router();

// router.get('/me', isAuth,validate(userValidation.getMe) ,awaitHandlerFactory(userController.getMe));

module.exports = router;
