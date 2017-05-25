import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HomeHero from '../../components/home/HomeHero';

describe('<HomeHero />', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MuiThemeProvider><HomeHero /></MuiThemeProvider>, div);
  });
  it('Matches snapshot with child', () => {
    const component = renderer.create(
      <MuiThemeProvider><HomeHero /></MuiThemeProvider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
