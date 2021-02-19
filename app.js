/**
 * Module dependencies.
 */
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const compression = require('compression');
const cors = require('cors');

/**
 * Create Express server.
 */
const app = express();

const corsOptions = {
  origin: 'http://localhost:8080'
};

app.use(cors(corsOptions));

// gzip compression
app.use(compression());

/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept');
  res.locals.user = req.user;
  next();
});

/**
 * Primary app routes.
 */

const routes = require('./routes');

app.use(routes);

/**
 * Error Handler.
 */
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Server Error');
  });
}

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
