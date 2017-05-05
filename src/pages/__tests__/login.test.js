import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import LoginPage from '../login';

describe('<LoginPage />', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><LoginPage /></MemoryRouter>, div);
  });
  /*  it('Matches snapshot', () => {
    const component = renderer.create(
      <MemoryRouter><LoginPage /></MemoryRouter>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });*/
});
