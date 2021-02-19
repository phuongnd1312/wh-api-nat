const express = require('express');
const accountRoutes = require('./user.route');
const authRoutes = require('./auth.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/user',
    route: accountRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
