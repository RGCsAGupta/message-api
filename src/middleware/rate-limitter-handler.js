const { RateLimiterMongo } = require('rate-limiter-flexible');
const mongoose = require('mongoose');
const { isProduction } = require('../utils');

const mongoConn = mongoose.connection;

const opts = {
  storeClient: mongoConn,
  points: 10, // Number of points
  duration: 1, // Per second(s)
};
if (!isProduction()) {
  opts.points = Number.MAX_SAFE_INTEGER;
}

const rateLimiterMongo = new RateLimiterMongo(opts);

module.exports.rateLimiterMiddleware = (req, res, next) => {
  rateLimiterMongo.consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send('Too Many Requests');
    });
};
