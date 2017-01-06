import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import reducer from './redux/reducer';
import './index.css';

import Home from './containers/home';
import Dashboard from './containers/dashboard';

const Wrapper = (props) => {
  return (
    <div>
      <h1>wrapper</h1>
      {props.children}
    </div>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

const NotFound = () => {
  return (<h1>404</h1>);
};

// Redux state
const store = createStore(
  combineReducers({
    reducer,
    routing: routerReducer,
  }),
  applyMiddleware(thunkMiddleware),
);

const DashboardEnter = (nextState, replace) => {
  console.log('dashboard enter');
  console.log(store.getState().reducer.authed);
  if (!store.getState().reducer.authed) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={Wrapper}>
        <Route path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} onEnter={DashboardEnter} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
