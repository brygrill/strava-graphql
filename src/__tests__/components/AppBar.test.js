import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from '../../components/AppBar';

describe('<AppBar />', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MuiThemeProvider><AppBar /></MuiThemeProvider>, div);
  });
  it('Matches snapshot with child', () => {
    const component = renderer.create(
      <MuiThemeProvider><AppBar /></MuiThemeProvider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});