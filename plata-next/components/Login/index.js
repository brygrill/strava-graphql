import React from 'react';
import { Grid, Form } from 'semantic-ui-react';

const Login = () => {
  return (
    <div>
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={4} only="computer" />
          <Grid.Column width={12} mobile={16} textAlign="center">
            <Form.Input label="Email:" name="email" placeholder="email" />
            <Form.Input label="Password:" name="password" placeholder="password" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Login;
