/* eslint-disable global-require */
const logger = require('debug')('app');
const { optionsDb } = require('../src/config/options.db');
const { init: initDb } = require('../src/services/db');

exports.mochaHooks = {
  beforeAll: async () => {
    await initDb(optionsDb);
  },
};
