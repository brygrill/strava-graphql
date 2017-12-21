import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import bodyParser from 'body-parser';
import { graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import admin from './config';
import mw from './middleware';
import schema from './graphql/schema/index.gql';
import resolvers from './graphql/resolvers';

// Put together a schema
const myGraphQLSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

// Init app
const app = express();

app.disable('x-powered-by');
app.use(helmet());

// Cors middleware
app.use(cors({ origin: true }));

// log requests to console in dev
if (process.env.NODE_ENV !== 'production') {
  app.use(logger('dev'));
}

// Auth middleware
app.use(mw.auth(admin));

// User middleware
// Used to pass user info to context
app.use(mw.user(admin.database().ref('users')));

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(req => ({
    schema: myGraphQLSchema,
    context: { uid: req.user.uid, strava_token: req.strava_token },
  })),
);

// Export app
export default app;
