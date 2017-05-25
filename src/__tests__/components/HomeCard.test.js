import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HomeCard from '../../components/home/HomeCard';

describe('<HomeCard />', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MuiThemeProvider><HomeCard /></MuiThemeProvider>, div);
  });
  it('Matches snapshot with child', () => {
    const component = renderer.create(
      <MuiThemeProvider><HomeCard /></MuiThemeProvider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
