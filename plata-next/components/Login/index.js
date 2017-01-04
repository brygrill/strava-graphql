import React from 'react';
import { Grid, Header, Form, Segment } from 'semantic-ui-react';

const Login = () => {
  return (
    <div className="plata-height-100">
      <Grid textAlign="center" verticalAlign="middle" className="plata-height-100">
        <Grid.Column className="login-column">
          <Header as="h2" content="Log-in to your Dashboard" />
          <Form size="large">
            <Segment>
              <Form.Input icon="user" iconPosition="left" name="email" placeholder="Email Address" />
              <Form.Input icon="lock" iconPosition="left" name="password" placeholder="Password" />
              <Form.Button fluid primary size="large">Login</Form.Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
      <style jsx>{`
      .login-column {
        max-width: 450px;
      }
    `}</style>
    </div>
  );
};

export default Login;
