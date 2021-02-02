const logError = require('debug')('app:error');

module.exports.logErrorsHandler = (err, req, res, next) => {
  logError(err.stack);
  next(err);
};
