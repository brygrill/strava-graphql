// @flow
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = (component: Component, authed, ...rest) => {
  return (
    <Route
      {...rest}
      render={(props: { location: Object }) =>
        (authed === true
          ? <Component {...props} />
          : <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />)}
    />
  );
};

export default PrivateRoute;

// thanks: https://github.com/tylermcginnis/react-router-firebase-auth/blob/master/src/components/index.js
