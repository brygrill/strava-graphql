// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from 'material-ui/styles';

import App from './app';

import theme from './theme';
import './theme/index.css';

import registerServiceWorker from './registerServiceWorker';

const AppAndTheme = () => (
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>
);

ReactDOM.render(<AppAndTheme />, document.getElementById('root'));
registerServiceWorker();
