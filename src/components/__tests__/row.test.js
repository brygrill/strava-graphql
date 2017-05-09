import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import row from '../row';

describe('<row />', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<row />, div);
  });
  it('Matches snapshot with child', () => {
    const component = renderer.create(<row />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
