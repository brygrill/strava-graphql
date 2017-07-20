import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import DashboardPage from '../../pages/DashboardPage';

const state = {
  loading: true,
  authed: false,
  user: {
    uid: process.env.REACT_APP_USER_FOR_TESTS,
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
