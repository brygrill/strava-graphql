import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import AppContainer from '../../components/AppContainer';

describe('<AppContainer />', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MuiThemeProvider><AppContainer /></MuiThemeProvider>, div);
  });
});
