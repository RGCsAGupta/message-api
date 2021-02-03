const AppError = require('./AppError');

/**
 * @openapi
 * components:
 *   responses:
 *     400BadRequest:       # Can be referenced as '#/components/responses/400BadRequest'
 *       description: Incorrect request body/params/query.
 */
module.exports = class BadRequest extends AppError {
  constructor() {
    super('400 Bad request');
  }

  getStatusCode() {
    return 400;
  }
};
