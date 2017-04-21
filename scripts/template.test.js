import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import MyComponent from '../mycomponent';

describe('<MyComponent />', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MyComponent />, div);
  });
  it('Matches snapshot with child', () => {
    const component = renderer.create(<MyComponent />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
