import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

import { currentUserToken } from '../utils';
import { functionsGraphql as uri } from '../config';

const httpLink = createHttpLink({
  uri,
});

const authLink = setContext((_, { headers }) => {
  currentUserToken.then(token => {
    console.log(token);
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null,
      },
    };
  });
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// client.query({ query: gql`{ hello }` }).then(console.log);

export default client;
