module.exports.pathNotFoundHandler = (req, res) => {
  res.status(404).send({ message: '404 Not Found' });
};
