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
app.use(
  '/',
  graphqlHTTP({
    schema,
    graphiql: env !== 'production', // only graphiql in dev
  }),
);

// Export app
module.exports = app;
