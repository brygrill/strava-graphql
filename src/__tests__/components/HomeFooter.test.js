import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HomeFooter from '../../components/home/HomeFooter';

describe('<HomeFooter />', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MuiThemeProvider><HomeFooter /></MuiThemeProvider>, div);
  });
  it('Matches snapshot with child', () => {
    const component = renderer.create(
      <MuiThemeProvider><HomeFooter /></MuiThemeProvider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
