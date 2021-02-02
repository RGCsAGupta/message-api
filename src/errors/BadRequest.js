const AppError = require('./AppError');

module.exports = class BadRequest extends AppError {
  constructor() {
    super('400 Bad request');
  }

  getStatusCode() {
    return 400;
  }
};
