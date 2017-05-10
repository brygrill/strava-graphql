// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from './theme';
import App from './app';
import './index.css';

const Plata = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
    <App />
  </MuiThemeProvider>
);

ReactDOM.render(<Plata />, document.getElementById('root'));
