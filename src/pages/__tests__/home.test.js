import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import HomePage from '../home';

describe('<HomePage />', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HomePage />, div);
  });
  it('Matches snapshot', () => {
    const component = renderer.create(<HomePage />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
