// @flow
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props: { location: Object }) =>
        (authed
          ? <Component {...props} />
          : <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />)}
    />
  );
};

export const LoginRoute = ({ component: Component, authed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props: { location: Object }) =>
        (!authed
          ? <Component {...props} />
          : <Redirect
              to={{ pathname: '/go', state: { from: props.location } }}
            />)}
    />
  );
};

export const ChildRoute = ({ component: Component, appState, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => <Component appState={appState} {...props} />}
    />
  );
};

export const NoMatchRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={props => <Component {...props} />} />;
};

// thanks: https://github.com/tylermcginnis/react-router-firebase-auth/blob/master/src/components/index.js
