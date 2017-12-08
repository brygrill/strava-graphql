const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const graphqlHTTP = require('express-graphql');

const mw = require('../middleware');
const schema = require('../graphql/schema');

// Get env
const env = process.env.NODE_ENV;

// Init app
const app = express();

// Init middleware
app.use(cors);

// Auth middleware
if (env === 'production') {
  app.use(mw.auth(admin));
}

// User middleware
// Used to pass user info to context
app.use(mw.user(admin.database().ref('users')));

// Serve graphql
// Only serve graphiql in dev
app.use('/', graphqlHTTP((req) => ({
  schema,
  context: { user: req.user, strava_token: req.strava_token },
  graphiql: env !== 'production',
})));

// Export app
module.exports = app;
