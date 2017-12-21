import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { PrivateRoute, PublicRoute, NoMatchRoute } from '../components/router/Routes';

const Public = () => <h3>Public</h3>;
const Protected = () => <h3>Protected</h3>;
const NotFound = () => <h3>Not Found</h3>;

const unAuthedState = {
  authed: false,
};
const authedState = {
  authed: true,
};

describe('<Routes />', () => {
  it('Private Route Renders Properly', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <PrivateRoute
          path="/private"
          appState={unAuthedState}
          component={Protected}
        />
      </MemoryRouter>,
      div,
    );
  });
  it('Public Route Renders Properly', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <PublicRoute path="/public" appState={authedState} component={Public} />
      </MemoryRouter>,
      div,
    );
  });
  it('NoMatch Route Renders Properly', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <NoMatchRoute
          path="/nope"
          appState={authedState}
          component={NotFound}
        />
      </MemoryRouter>,
      div,
    );
  });
});
