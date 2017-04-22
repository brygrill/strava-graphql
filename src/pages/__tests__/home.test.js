import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import HomePage from '../home';

const mockState = {
  loading: true,
  authed: false,
  user: null,
};

describe('<HomePage />', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter><HomePage appState={mockState} /></MemoryRouter>,
      div,
    );
  });
  it('Matches snapshot', () => {
    const component = renderer.create(
      <MemoryRouter><HomePage appState={mockState} /></MemoryRouter>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
