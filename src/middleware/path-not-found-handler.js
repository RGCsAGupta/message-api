const ResourceNotFound = require('../errors/ResourceNotFound');

module.exports.pathNotFoundHandler = (req, res, next) => {
  next(new ResourceNotFound());
};
