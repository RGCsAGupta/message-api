const AppError = require('../errors/AppError');

// eslint-disable-next-line no-unused-vars
module.exports.errorHandler = (err, req, res, _next) => {
  if (err instanceof AppError) {
    return res
      .status(err.getStatusCode())
      .send({ error: err.message });
  }
  return res.status(500).send({ error: err });
};
