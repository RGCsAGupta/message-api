/* eslint-disable global-require */
const { optionsDb } = require('../src/config/options.db');
const { init: initDb } = require('../src/services/db');
const { deleteAll } = require('../src/services/message');

exports.mochaHooks = {
  beforeAll: async function cleanup() {
    this.timeout(10000);
    await initDb(optionsDb);
    await deleteAll();
  },
};
