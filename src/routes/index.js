const router = require('express').Router();
const { docsRouter } = require('./docs');
const { apiRouter } = require('./api/v1');

router.use('/docs', docsRouter);

router.use('/api/v1', apiRouter);

module.exports.router = router;
