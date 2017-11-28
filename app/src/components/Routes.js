import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const propTypes = {
  component: PropTypes.func.isRequired,
  appState: PropTypes.object.isRequired,
};

export const PrivateRoute = ({ component: Component, appState, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        appState.authed ? (
          <Component appState={appState} {...props} />
        ) : (
          <Redirect to={{ pathname: '/' }} />
        )
      }
    />
  );
};

PrivateRoute.propTypes = propTypes;

export const PublicRoute = ({ component: Component, appState, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        !appState.authed ? (
          <Component appState={appState} {...props} />
        ) : (
          <Redirect to={{ pathname: '/dashboard' }} />
        )
      }
    />
  );
};

PublicRoute.propTypes = propTypes;

export const NoMatchRoute = ({ component: Component, appState, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => <Component appState={appState} {...props} />}
    />
  );
};

NoMatchRoute.propTypes = propTypes;
