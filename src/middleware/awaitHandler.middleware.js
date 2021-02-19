const awaitHandler = (middleware) => async (req, res, next) => {
  try {
    await middleware(req, res, next);
  } catch (err) {
    next(err);
  }
};

module.exports = awaitHandler;
