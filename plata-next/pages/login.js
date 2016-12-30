import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import Head from '../components/Head';

const Login = () => {
  return (
    <div>
      <Head />
      <Container>
        <Header
          as="h1"
          textAlign="center"
          content="Login"
        />
      </Container>
    </div>
  );
};

export default Login;
