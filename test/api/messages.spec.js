const assert = require('assert');
const { v4: uuidv4 } = require('uuid');
const { getUnAuthorizedAgent, getAuthorizedAgent } = require('../utils');

const api = '/api/v1/messages';
describe('TEST /api/v1/messages', () => {
  const createMessagePayload = {
    text: 'test message',
  };
  describe('POST /', () => {
    it('should not create with unauthorized token', (done) => {
      getUnAuthorizedAgent()
        .post(api)
        .send(createMessagePayload)
        .expect(401, 'Unauthorized', done);
    });
    it('should create with authorized token', (done) => {
      getAuthorizedAgent()
        .post(api)
        .send(createMessagePayload)
        .expect(200, done);
    });
  });
  describe('GET /', () => {
    it('should not load with unauthorized token', (done) => {
      getUnAuthorizedAgent()
        .get(api)
        .expect(401, 'Unauthorized', done);
    });
    it('should load with authorized token', (done) => {
      getAuthorizedAgent()
        .get(api)
        .expect(200)
        .expect((res) => {
          const {
            total, page, pageSize, messages,
          } = res.body;
          assert.strictEqual(total, 1);
          assert.strictEqual(page, 0);
          assert.strictEqual(pageSize, 1);
          assert.strictEqual(messages.length, 1);
          assert.strictEqual(messages[0].text, createMessagePayload.text);
        })
        .end(done);
    });
  });
});
describe('TEST /api/v1/messages/:message_id', () => {
  let testMessage;
  beforeEach('create new message', (done) => {
    getAuthorizedAgent()
      .post(api)
      .send({ text: uuidv4() })
      .expect(200)
      .expect((res) => {
        assert.ok(res.body.id);
        testMessage = res.body;
      })
      .end(done);
  });
  describe('GET /:message_id', () => {
    it('should not load with unauthorized token', (done) => {
      getUnAuthorizedAgent()
        .get(`${api}/${testMessage.id}`)
        .expect(401, 'Unauthorized', done);
    });
    it('should load with authorized token', (done) => {
      getAuthorizedAgent().get(`${api}/${testMessage.id}`).expect(200, done);
    });
    it('should error with authorized token and incorrect messageID', (done) => {
      getAuthorizedAgent()
        .get(`${api}/${uuidv4()}`)
        .expect(400, { error: '400 Bad request' }, done);
    });
  });
  describe('PUT /:message_id', () => {
    it('should not update with unauthorized token', (done) => {
      getUnAuthorizedAgent()
        .put(`${api}/${testMessage.id}`)
        .expect(401, 'Unauthorized', done);
    });
    it('should update with authorized token', (done) => {
      getAuthorizedAgent()
        .put(`${api}/${testMessage.id}`)
        .send({ text: 'updated' })
        .expect(200)
        .expect(({ body: { text } }) => assert.strictEqual(text, 'updated'))
        .end(done);
    });
  });
  describe('DELETE /:message_id', () => {
    it('should not delete with unauthorized token', (done) => {
      getUnAuthorizedAgent()
        .delete(`${api}/${testMessage.id}`)
        .expect(401, 'Unauthorized', done);
    });
    it('should delete with authorized token', (done) => {
      getAuthorizedAgent()
        .delete(`${api}/${testMessage.id}`)
        .expect(200, done);
    });
  });
});
