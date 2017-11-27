// @flow
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

type Props = {
  component: Function,
  appState: Object,
};

export const PrivateRoute = ({
  component: Component,
  appState,
  ...rest
}: Props) => {
  return (
    <Route
      {...rest}
      render={(props: { location: Object }) =>
        (appState.authed
          ? <Component appState={appState} {...props} />
          : <Redirect
              to={{ pathname: '/', state: { from: props.location } }}
            />)}
    />
  );
};

export const PublicRoute = ({
  component: Component,
  appState,
  ...rest
}: Props) => {
  return (
    <Route
      {...rest}
      render={(props: { location: Object }) =>
        (!appState.authed
          ? <Component appState={appState} {...props} />
          : <Redirect
              to={{ pathname: '/dashboard', state: { from: props.location } }}
            />)}
    />
  );
};

export const AppRoute = ({
  component: Component,
  appState,
  ...rest
}: Props) => {
  return (
    <Route
      exact
      {...rest}
      render={props => <Component appState={appState} {...props} />}
    />
  );
};

export const NoMatchRoute = ({
  component: Component,
  appState,
  ...rest
}: Props) => {
  return (
    <Route
      {...rest}
      render={props => <Component appState={appState} {...props} />}
    />
  );
};

// thanks: https://github.com/tylermcginnis/react-router-firebase-auth/blob/master/src/components/index.js
