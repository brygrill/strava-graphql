import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import menu from '../mycomponent';

describe('<menu />', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<menu />, div);
  });
  it('Matches snapshot with child', () => {
    const component = renderer.create(<menu />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
