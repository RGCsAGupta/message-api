const { getAgent } = require("../utils");

describe('GET /', () => {
  it('should not be found', (done) => {
    getAgent().get('/').expect(404, done);
  });
});
