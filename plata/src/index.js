// Import React and Redux stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './redux/reducer';
import { validateToken } from './redux/actions';
import './index.css';

// App Containers
import Wrapper from './containers/wrapper';
import Home from './containers/home';
import Dashboard from './containers/dashboard';

// Components
import NotFound from './components/404';

// Redux state
const store = createStore(
  combineReducers({
    reducer,
    routing: routerReducer,
  }),
  applyMiddleware(thunkMiddleware),
);

// Make browser history available to props
const history = syncHistoryWithStore(browserHistory, store);

// Check for token on initial load
// If its valid, user will be signed in
const token = localStorage.getItem('token');
if (token !== null) {
  store.dispatch(validateToken(token));
}

// Protect dashboard if not authed
const ProtectedRoute = (nextState, replace) => {
  if (!store.getState().reducer.isAuthenticated) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

// Render app to DOM
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={Wrapper}>
        <Route path="/" component={Home} />
        <Route
          path="/dashboard"
          component={Dashboard}
          onEnter={ProtectedRoute}
        />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
