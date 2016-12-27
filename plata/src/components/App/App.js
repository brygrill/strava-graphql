/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Match from 'react-router/Match';
import Miss from 'react-router/Miss';
import { Container, Header } from 'semantic-ui-react';
import Home from '../Home/Home';
import Login from '../Login/Login';
import './App.css';

const NoMatch = () => (
  <h1>404!</h1>
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <Header as="h1">Plata App!!</Header>
          <Match exactly pattern="/" component={Home} />
          <Match pattern="/login" component={Login} />
          <Miss component={NoMatch} />
        </Container>
      </div>
    );
  }
}

export default App;
