import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import LoginPage from '../login';

describe('<LoginPage />', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LoginPage />, div);
  });
  it('Matches snapshot', () => {
    const component = renderer.create(<LoginPage />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
