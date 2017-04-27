import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import LoginGoogleComponent from '../login/login-google-btn';

describe('<LoginGoogleComponent />', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LoginGoogleComponent />, div);
  });
  it('Matches snapshot with child', () => {
    const component = renderer.create(<LoginGoogleComponent />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
