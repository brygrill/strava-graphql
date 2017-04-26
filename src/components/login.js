// @flow
/* global SyntheticEvent */
import React, { Component } from 'react';
import { Grid, Segment, Form, Message, Image } from 'semantic-ui-react';
import base from '../rebase';
import LoginGoogleComponent from './login-google-btn';

// Styles
const segmentStyle = {
  paddingTop: '2rem',
};

class LoginComponent extends Component {
  defaultProps: {
    colWidth: '450px',
    mobile: true,
  };

  state = {
    email: '',
    pwd: '',
  };

  componentDidMount() {
    console.log('CDM Login Page');
  }

  props: {
    colWidth: string,
    mobile: boolean,
    logo: string,
    login: Function,
    error: boolean,
    btnColor: string,
  };

  updateField = (evt: SyntheticEvent) => {
    const target = evt.target;
    if (target instanceof HTMLInputElement) {
      const field = target.name;
      const value = target.value;
      this.setState({ [field]: value });
    }
  };

  handleSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault();
    this.props.login(this.state);
    this.setState({
      email: '',
      pwd: '',
    });
  };

  handleGoogleLoginError = (err: Object) => {
    if (err) console.log(err);
  };

  handleGoogleLogin = (evt: SyntheticEvent) => {
    evt.preventDefault();
    base.authWithOAuthRedirect('google', this.handleGoogleLoginError);
  };

  render() {
    const { colWidth, logo, mobile, btnColor } = this.props;
    const topPadding = {
      paddingTop: mobile ? '6rem' : '16rem',
    };
    const formWidth = {
      maxWidth: colWidth,
    };
    const btnBackColor = { backgroundColor: btnColor };
    return (
      <Grid relaxed centered style={topPadding}>
        <Grid.Column
          width={16}
          style={formWidth}
          textAlign="center"
          verticalAlign="middle"
          className="ppd-padding-1"
        >
          <Segment raised style={segmentStyle}>
            <Image src={logo} size="small" centered />
            <LoginGoogleComponent handleClick={this.handleGoogleLogin} />
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment basic>
                <Form.Input
                  icon="user"
                  iconPosition="left"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.updateField}
                />
                <Form.Input
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={this.state.pwd}
                  onChange={this.updateField}
                />
                <Form.Button
                  fluid
                  primary
                  size="large"
                  content="LOGIN"
                  style={btnBackColor}
                />
              </Segment>
            </Form>

            <Message
              hidden={!this.props.error}
              error
              header="Login Error"
              content="Please enter valid credentials."
            />
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default LoginComponent;
