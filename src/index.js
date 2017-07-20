// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import App from './app';

import registerServiceWorker from './registerServiceWorker';

const TriPlan = () => (
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);

ReactDOM.render(<TriPlan />, document.getElementById('root'));
registerServiceWorker();
