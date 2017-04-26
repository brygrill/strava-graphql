import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import LoadingComponent from '../loading';

describe('<LoadingComponent />', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LoadingComponent />, div);
  });
  it('Matches snapshot', () => {
    const component = renderer.create(<LoadingComponent />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
