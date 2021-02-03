const supertest = require('supertest');
const app = require('../src/app');

const agent = supertest.agent(app);
module.exports.getAuthorizedAgent = () => agent.auth('super-secret-test-token', { type: 'bearer' });

module.exports.getUnAuthorizedAgent = () => agent.auth('invalid', { type: 'bearer' });

module.exports.getNoAuthAgent = () => agent;
