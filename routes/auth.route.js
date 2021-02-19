const express = require('express');
const authController = require('../src/controllers/auth.controller');
const authValidation = require('../src/validations/auth.validation');
const awaitHandler = require('../src/middleware/awaitHandler.middleware');
const validate = require('../src/middleware/validate.middleware');

const router = express.Router();

// router.post('/signUp', validate(authValidation.signUp) ,awaitHandler(authController.signUp));

module.exports = router;
