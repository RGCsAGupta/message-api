const passport = require('passport');
const router = require('express').Router();
const { docsRouter } = require('./docs');
const { apiRouter } = require('./api/v1');

router.use('/docs', docsRouter);

/**
 * @openapi
 * components:
 *   securitySchemes:
 *   bearerAuth:            # arbitrary name for the security scheme
 *         type: http
 *   scheme: bearer
 *
 * @openapi
 * security:
 *   - bearerAuth: []
 *
 * @openapi
 * components:
 *   responses:
 *    UnauthorizedError:
 *      description: Access token is missing or invalid
 */

router.use('/api/v1', passport.authenticate('bearer', { session: false }), apiRouter);

module.exports.router = router;
