import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router/BrowserRouter';
import App from './components/App/App';
import './index.css';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
