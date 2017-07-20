// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import lightBlue from 'material-ui/colors/lightBlue';

import App from './app';
import './theme/index.css';

import registerServiceWorker from './registerServiceWorker';

const theme = createMuiTheme({
  palette: createPalette({
    primary: lightBlue,
  }),
});

const AppAndTheme = () => (
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>
);

ReactDOM.render(<AppAndTheme />, document.getElementById('root'));
registerServiceWorker();
