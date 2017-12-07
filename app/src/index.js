import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import './index.css';
import App from './components/App';
import client from './graphql/client';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
