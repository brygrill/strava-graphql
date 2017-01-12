import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Home from '../../containers/home';

it('Home container renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Home />, div);
});

test('Home pages shows the home page!', () => {
  const component = renderer.create(<Home />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
