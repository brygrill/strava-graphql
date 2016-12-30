/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Router from 'react-router/BrowserRouter';
import Match from 'react-router/Match';
import Redirect from 'react-router/Redirect';
import Miss from 'react-router/Miss';
import { Container, Header } from 'semantic-ui-react';
import { firebaseAuth } from '../../firebase';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Athlete from '../Athlete/Athlete';
import './App.css';

const NoMatch = () => (
  <h1>404!</h1>
);

const AthleteMatch = ({ component: AuthedComponent, authed }) => {
  console.log(authed);
  return (<Match
    pattern="/athlete"
    render={() => (
    authed ? (
      <AuthedComponent />
    ) : (
      <Redirect to="/login" />
    )
    )}
  />);
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      authed: false,
      athlete: null,
    };
  }

  componentDidMount() {
    firebaseAuth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) this.setState({ authed: true, athlete: user });
    });
  }
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Container>
              <Header as="h1">Plata App!!</Header>
              <Match exactly pattern="/" component={Home} />
              <Match pattern="/login" component={Login} />
              <AthleteMatch authed={this.state.authed} component={Athlete} />
              <Miss component={NoMatch} />
            </Container>;
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
