import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AuthModal from '../../components/AuthModal';

describe('<AuthModal />', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MuiThemeProvider><AuthModal open /></MuiThemeProvider>,
      div,
    );
  });
  it('Matches snapshot with child', () => {
    const component = renderer.create(
      <MuiThemeProvider><AuthModal open /></MuiThemeProvider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
