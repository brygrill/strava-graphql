// @flow
/* global SyntheticEvent */
import React, { Component } from 'react';
import {
  Grid,
  Segment,
  Form,
  Message,
  Image,
  Header,
  Dimmer,
  Loader,
  Divider,
} from 'semantic-ui-react';
import LoginGoogleComponent from './login-google-btn';

import { colors, fonts, paddingBot1 } from '../../css';

// Styles
const flexLayout = {
  justifyContent: 'center',
  alignContent: 'center',
  width: '100%',
  margin: 0,
};

const segmentStyle = {
  paddingTop: '2rem',
  margin: 0,
};

// Header Styles
const headerStyles = {
  marginTop: '1rem',
  fontWeight: fonts.light,
};

const signInMsgStyles = {
  marginTop: '1rem',
  marginBottom: 0,
  fontWeight: fonts.light,
  color: colors.gray1,
};

class LoginComponent extends Component {
  defaultProps: {
    colWidth: '450px',
    mobile: true,
  };

  state = {
    email: '',
    password: '',
  };

  props: {
    colWidth: string,
    logo: string,
    headerImg: string,
    btnColor: string,
    error: boolean,
    loading: boolean,
    loginEmail: Function,
    loginGmail: Function,
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
    this.props.loginEmail(this.state);
    this.setState({
      email: '',
      password: '',
    });
  };

  render() {
    const { colWidth, logo, headerImg, btnColor, loading, loginGmail } = this
      .props;
    const formStyle = {
      maxWidth: colWidth,
      padding: 0,
    };
    const btnBackColor = { backgroundColor: btnColor };
    return (
      <Grid relaxed centered columns={16} style={flexLayout}>
        <Grid.Column
          width={16}
          style={formStyle}
          textAlign="center"
          verticalAlign="middle"
        >
          <Dimmer.Dimmable blurring>
            <Dimmer active={loading} as={Segment} inverted>
              <Loader />
            </Dimmer>
            <Segment raised style={segmentStyle}>
              <div style={paddingBot1}>
                <Image src={headerImg} size="tiny" centered />
              </div>
              <Image src={logo} size="small" centered />
              <Header
                size="medium"
                content="Simple Weekly Training Plans."
                style={headerStyles}
              />
              <Divider hidden />
              <Header
                size="small"
                content="Get started by signing in with your Google account."
                style={signInMsgStyles}
              />
              <LoginGoogleComponent
                handleClick={loginGmail}
                hideGoogle={false}
                hideEmailPwd
              />
              <Form
                size="large"
                onSubmit={this.handleSubmit}
                style={{ display: 'none' }}
              >
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
                    value={this.state.password}
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
          </Dimmer.Dimmable>
        </Grid.Column>

      </Grid>
    );
  }
}

export default LoginComponent;
