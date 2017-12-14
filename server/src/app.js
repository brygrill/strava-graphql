import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import graphqlHTTP from 'express-graphql';

import admin from './config';
import mw from '../middleware';
import schema from '../graphql/schema';

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

// Serve graphql
// Only serve graphiql in dev
app.use('/graphql', graphqlHTTP((req) => ({
  schema,
  context: { uid: req.user.uid, strava_token: req.strava_token },
})));

// Export app
export default app;
