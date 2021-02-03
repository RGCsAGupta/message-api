const AppError = require('./AppError');
/**
 * @openapi
 * components:
 *   responses:
 *     404NotFound:       # Can be referenced as '#/components/responses/404NotFound'
 *       description: The specified resource was not found.
 */
module.exports = class ResourceNotFound extends AppError {
  constructor() {
    super('404 Not Found');
  }

  getStatusCode() {
    return 404;
  }
};
