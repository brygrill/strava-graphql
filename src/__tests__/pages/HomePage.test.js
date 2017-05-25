import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HomePage from '../../pages/HomePage';

const state = {
  loading: true,
  authed: false,
  user: {
    uid: null,
  },
};

describe('<HomePage />', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MuiThemeProvider><HomePage appState={state} /></MuiThemeProvider>,
      div,
    );
  });
});
