const AppError = require('./AppError');

module.exports = class InternalServer extends AppError {
  constructor() {
    super('500 internal server error');
  }

  getStatusCode() {
    return 500;
  }
};
