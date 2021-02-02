const pJSON = require('../../package.json');

module.exports = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: pJSON.name,
      version: pJSON.version,
    },
  },
  apis: [
    './src/models*.js',
    './src/models/**/*.js',
    './src/routes*.js',
    './src/routes/**/*.js',
  ],
};
