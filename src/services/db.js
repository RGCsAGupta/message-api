const mongoose = require('mongoose');
const logger = require('debug')('db');

const error = logger.extend('db:error');

module.exports.init = async ({
  user, pass, host, name,
}) => {
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
  const db = mongoose.connection;
  db.on('error', (err) => { error(`connection error:${err}`); });
  db.once('open', () => { logger('connected to db'); });

  await mongoose.connect(host, {
    dbName: name,
    user,
    pass,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
