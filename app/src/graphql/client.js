import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { currentUserToken } from '../utils';
import { functionsGraphql as uri } from '../config';

const httpLink = createHttpLink({
  uri,
});

const authLink = setContext(
  (_, { headers }) =>
    new Promise((resolve, reject) => {
      currentUserToken()
        .then(token => {
          resolve({
            headers: {
              ...headers,
              authorization: token ? `Bearer ${token}` : null,
            },
          });
        })
        .catch(() => {
          reject({ headers });
        });
    }),
);

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
