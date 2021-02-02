const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const csrf = require('csurf');
const helmet = require('helmet');
const methodOverride = require('method-override');

const { pathNotFoundHandler } = require('./middleware/path-not-found-handler');
const { logErrorsHandler } = require('./middleware/log-errors-handler');
const { clientErrorHandler } = require('./middleware/client-error-handler');
const { errorHandler } = require('./middleware/error-handler');
const { rateLimiterMiddleware } = require('./middleware/rate-limitter-handler');
const { router } = require('./routes');
const { isProduction } = require('./utils');

const app = express();
app.use(rateLimiterMiddleware);
// logging middleware
app.use(logger('dev'));

// initialize parsers
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride());

// security
if (isProduction()) {
  app.use(csrf({ cookie: true }));
}

app.use(cors());
app.use(helmet());

// app routes
app.use(router);

app.use(pathNotFoundHandler);

// error handlers
app.use(logErrorsHandler);
app.use(clientErrorHandler);
app.use(errorHandler);

module.exports = app;
