module.exports.clientErrorHandler = (err, req, res, next) => {
  if (req.xhr) {
    return res.status(500).send({ error: 'Something failed!' });
  }

  return next(err);
};
