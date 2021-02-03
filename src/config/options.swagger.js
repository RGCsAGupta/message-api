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
    './src/**/*.js',
  ],
};
