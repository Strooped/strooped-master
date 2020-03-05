/**
 * Creates a server instance of the front-end application.
 * Used in review, staging and production instances primarily.
 *
 * On local development are usually webpack-dev-server used
 */

/* eslint-disable comma-dangle */

const express = require('express');
const path = require('path');
const helmet = require('helmet');
const logger = require('morgan');

const app = express();

app.use(helmet());
app.use(logger('common'));

const staticDir = path.resolve(__dirname, 'dist');
console.info(`Serving files from ${staticDir}`);

app.use('/static', express.static(path.join(staticDir, 'static'), {
  maxAge: '2 days'
}));

// Ensure this is placed before /public static-dir
app.use('/public/favicon.ico', (req, res) => {
  res.sendFile(path.join(staticDir, 'favicon.ico'));
});

app.use('/favicon.ico', (req, res) => {
  res.sendFile(path.join(staticDir, 'favicon.ico'));
});

app.use('/public', express.static(path.join(staticDir, 'public')));

// Always send the same file, so that our router can handle the routing.
app.get('*', (req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Running app at http://127.0.0.1:${port}`);
});
