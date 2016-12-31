import React from 'react';
import { Container, Header, Grid, Form, Image } from 'semantic-ui-react';
import Head from '../components/Head';

const Login = () => {
  return (
    <div>
      <Head />
      <Container>
        <Grid container centered columns={1}>
          <Grid.Row>
            <Grid.Column>
              <Header
                as="h1"
                textAlign="center"
                content="Login"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Image src="/static/favicons/android-chrome-192x192.png" height="192" width="192" />
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form>
                <Form.Group widths="equal">
                  <Form.Input
                    label="Email"
                    placeholder="email"
                    name="email"
                  />
                  <Form.Input
                    label="Password"
                    placeholder="password"
                    name="password"
                    type="password"
                  />
                </Form.Group>
                <Form.Button primary fluid>Sign In</Form.Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
