// @flow
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  console.log('here');
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
  console.log('here');
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
  console.log('here');
  return (
    <Route
      {...rest}
      render={props => <Component appState={appState} {...props} />}
    />
  );
};

// thanks: https://github.com/tylermcginnis/react-router-firebase-auth/blob/master/src/components/index.js
