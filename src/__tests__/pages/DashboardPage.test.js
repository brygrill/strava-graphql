import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DashboardPage from '../../pages/DashboardPage';

const state = {
  loading: true,
  authed: false,
  user: {
    uid: null,
  },
};

describe('<DashboardPage />', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MuiThemeProvider><DashboardPage appState={state} /></MuiThemeProvider>,
      div,
    );
  });
});
