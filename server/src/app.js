import express from 'express';
// import admin from 'firebase-admin';
import cors from 'cors';
import graphqlHTTP from 'express-graphql';

// import mw from '../middleware';
// import schema from '../graphql/schema';

// Init app
const app = express();

// Cors middleware
app.use(cors({ origin: true }));

// // Auth middleware
// app.use(mw.auth(admin));

// // User middleware
// // Used to pass user info to context
// app.use(mw.user(admin.database().ref('users')));

// // Serve graphql
// // Only serve graphiql in dev
// app.use('/', graphqlHTTP((req) => ({
//   schema,
//   context: { uid: req.user.uid, strava_token: req.strava_token },
// })));

app.get('/', (req, res) => res.send('Hello dash!'));

// Export app
export default app;
