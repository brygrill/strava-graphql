import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import graphqlHTTP from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';
import admin from './config';
import mw from './middleware';
// import schema from './graphql/schema';
import schema from './graphql/schema/test.gql';

// Some fake data
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// The GraphQL schema in string form
// const typeDefs = `
//   type Query { books: [Book] }
//   type Book { title: String, author: String }
// `;

// The resolvers
const resolvers = {
  Query: { books: () => books },
};

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
// app.use(mw.auth(admin));

// // User middleware
// // Used to pass user info to context
// app.use(mw.user(admin.database().ref('users')));

// Serve graphql
// Only serve graphiql in dev
// app.use('/graphql', graphqlHTTP((req) => ({
//   schema,
//   context: { uid: req.user.uid, strava_token: req.strava_token },
// })));

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({ schema: myGraphQLSchema }),
);

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Export app
export default app;
