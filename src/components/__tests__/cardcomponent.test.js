import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import CardComponent from '../mycomponent';

describe('<CardComponent />', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CardComponent />, div);
  });
  it('Matches snapshot with child', () => {
    const component = renderer.create(<CardComponent />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
