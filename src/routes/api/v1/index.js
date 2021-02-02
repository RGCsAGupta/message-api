const router = require('express').Router();

const { messagesApiRouter } = require('./messages');

router.use('/messages', messagesApiRouter);

module.exports.apiRouter = router;
