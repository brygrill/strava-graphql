import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HomeCardWrap from '../../components/home/HomeCardWrap';

describe('<HomeCardWrap />', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MuiThemeProvider><HomeCardWrap /></MuiThemeProvider>, div);
  });
  it('Matches snapshot with child', () => {
    const component = renderer.create(
      <MuiThemeProvider><HomeCardWrap /></MuiThemeProvider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
