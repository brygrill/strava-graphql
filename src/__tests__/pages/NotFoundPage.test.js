import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NotFoundPage from '../../pages/NotFoundPage';

const state = {
  loading: true,
  authed: false,
  user: {
    uid: null,
  },
};

describe('<NotFoundPage />', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MuiThemeProvider><NotFoundPage appState={state} /></MuiThemeProvider>,
      div,
    );
  });
});
