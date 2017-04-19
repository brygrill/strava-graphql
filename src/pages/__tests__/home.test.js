import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import HomePage from '../home';

describe('<HomePage />', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><HomePage /></MemoryRouter>, div);
  });
  it('Matches snapshot', () => {
    const component = renderer.create(
      <MemoryRouter><HomePage /></MemoryRouter>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
