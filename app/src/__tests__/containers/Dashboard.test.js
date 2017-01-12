import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Dashboard from '../../containers/Dashboard';

it('Dashboard container renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Dashboard />, div);
});

test('Dashboard shows dashboard page!', () => {
  const component = renderer.create(<Dashboard />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
