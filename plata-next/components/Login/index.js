import React, { PropTypes } from 'react';
import { Grid, Header, Form, Segment } from 'semantic-ui-react';

const Login = (props) => {
  return (
    <div className="plata-height-100">
      <Grid textAlign="center" verticalAlign="middle" className="plata-height-100">
        <Grid.Column className="login-column">
          <Header as="h2" content={props.title} />
          <Form size="large" onSubmit={props.handleSubmit}>
            <Segment>
              <Form.Input
                icon="user"
                iconPosition="left"
                name="email"
                type="email"
                placeholder="Email Address"
                value={props.emailVal}
                onChange={props.emailChange}
              />
              <Form.Input
                icon="lock"
                iconPosition="left"
                name="password"
                type="password"
                placeholder="Password"
                value={props.pwdVal}
                onChange={props.pwdChange}
              />
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

Login.defaultProps = {
  title: 'Login',
};

Login.propTypes = {
  title: PropTypes.string,
  emailVal: PropTypes.string.isRequired,
  emailChange: PropTypes.func.isRequired,
  pwdVal: PropTypes.string.isRequired,
  pwdChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default Login;
