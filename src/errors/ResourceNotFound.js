const AppError = require('./AppError');

module.exports = class ResourceNotFound extends AppError {
  constructor() {
    super('404 Not Found');
  }

  getStatusCode() {
    return 404;
  }
};
