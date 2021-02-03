const BearerStrategy = require('passport-http-bearer');
const { loadByToken } = require('../services/user');

module.exports.configure = (passport) => {
  passport.use(new BearerStrategy(
    (token, done) => {
      loadByToken(token, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false);
        return done(null, user, { scope: 'all' });
      });
    },
  ));
};
