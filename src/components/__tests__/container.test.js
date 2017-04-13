import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ContainerComponent from '../container';

describe('<ContainerComponent />', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ContainerComponent><h1>TEST!</h1></ContainerComponent>,
      div,
    );
  });
  it('Matches snapshot with child', () => {
    const component = renderer.create(
      <ContainerComponent><h1>TEST!</h1></ContainerComponent>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
