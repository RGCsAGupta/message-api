const AppError = require('./AppError');

/**
 * @openapi
 * components:
 *   responses:
 *     500InternalServerError: # Can be referenced as'#/components/responses/500InternalServerError'
 *       description: unknown server error happened.
 */
module.exports = class InternalServer extends AppError {
  constructor() {
    super('500 internal server error');
  }

  getStatusCode() {
    return 500;
  }
};
