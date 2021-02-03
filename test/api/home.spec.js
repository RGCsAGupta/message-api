const { getNoAuthAgent } = require('../utils');

describe('GET /', () => {
  it('should not be found', (done) => {
    getNoAuthAgent().get('/').expect(404, done);
  });
});
