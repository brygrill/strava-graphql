import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../../pages';

test('Home pages shows the home page!', () => {
  const component = renderer.create(<Home />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
