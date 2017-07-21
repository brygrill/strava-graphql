import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import TopLinearLoader from '../../components/TopLinearLoader';

describe('<TopLinearLoader />', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MuiThemeProvider><TopLinearLoader /></MuiThemeProvider>,
      div,
    );
  });
});
