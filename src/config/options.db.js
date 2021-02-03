const resolveDbName = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return 'local-db';
    case 'test':
    case 'CI':
      return 'test';
    default:
      return 'prod';
  }
};

module.exports.optionsDb = {
  user: process.env.DB_USER || '',
  pass: process.env.DB_PASS || '',
  host: process.env.DB_HOST || 'localhost',
  name: process.env.DB_NAME || resolveDbName(),
};
