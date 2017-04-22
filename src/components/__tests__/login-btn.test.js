import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import LoginButtonComponent from '../login-btn';

describe('<LoginButtonComponent />', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <LoginButtonComponent
          authed
          authedTo="/go"
          authedLabel="DASHBOARD"
          noAuthedTo="/login"
          noAuthedLabel="LOGIN"
        />
      </MemoryRouter>,
      div,
    );
  });
  it('Matches snapshot when authed', () => {
    const component = renderer.create(
      <MemoryRouter>
        <LoginButtonComponent
          authed
          authedTo="/go"
          authedLabel="DASHBOARD"
          noAuthedTo="/login"
          noAuthedLabel="LOGIN"
        />
      </MemoryRouter>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Matches snapshot when no authed', () => {
    const component = renderer.create(
      <MemoryRouter>
        <LoginButtonComponent
          authed={false}
          authedTo="/go"
          authedLabel="DASHBOARD"
          noAuthedTo="/login"
          noAuthedLabel="LOGIN"
        />
      </MemoryRouter>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
