import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { currentUserToken } from '../utils';
import { graphql as uri } from '../config';

const httpLink = createHttpLink({
  uri,
});

const authLink = setContext(async (_, { headers }) => {
  const token = await currentUserToken();
  console.log(token);
  try {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null,
      },
    };
  } catch (error) {
    return { headers };
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
