const InternalServer = require('../errors/InternalServer');

module.exports.clientErrorHandler = (err, req, res, next) => {
  if (req.xhr) {
    return next(new InternalServer());
  }

  return next(err);
};
