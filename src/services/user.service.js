const bcrypt = require('bcrypt');
const { Users } = require('../models/users.model');

const findUser = async (body) => Users.findOne({
  where: {
    email: body.email,
  },
});

const createUser = async (body) => {
  let user = await findUser(body);
  if (user === null) {
    bcrypt.hash(body.password, 10, async (err, hash) => {
      if (err) { return next(err); }
      user = await Users.create({
        username: body.username,
        email: body.email,
        role: 'customer',
        password: hash,
      });
    });
    return user;
  }
  return user;
};

module.exports = {
  createUser
};
