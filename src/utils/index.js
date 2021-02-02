const { options } = require('../config');

/**
 * Normalize a port into a number, string, or false.
 */
module.exports.normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

module.exports.isProduction = () => options.ENV === 'production';

/**
 * utils function to wrap async controllers to provide error handling without try/catch
 *
 * @param {Promise<>} controller
 * @return express controller
 */
module.exports.controllerWrapper = (controller) => (req, res, next) => controller(req, res, next)
  .catch(next);
