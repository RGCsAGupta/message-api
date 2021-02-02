// eslint-disable-next-line no-unused-vars
module.exports.errorHandler = (err, req, res, _next) => {
  res.status(500).send({ error: err });
};
