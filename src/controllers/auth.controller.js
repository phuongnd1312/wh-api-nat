const httpStatus = require('http-status');
const userService = require('../services/user.service');
const authService = require('../services/auth.service');

exports.signUp = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    const tokens = await authService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user, tokens });
  } catch (e) {
    console.log(e);
  }
};
