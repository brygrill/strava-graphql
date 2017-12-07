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

// Only use auth in production
if (env === 'production') {
  app.use(mw.auth(admin));
}

// Serve graphql
// Only serve graphiql in dev
app.use('/', graphqlHTTP({ schema, graphiql: env !== 'production' }));

// Export app
module.exports = app;
