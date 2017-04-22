// @flow
/* global SyntheticEvent */
import React, { Component } from 'react';
import { Grid, Segment, Form, Message, Image } from 'semantic-ui-react';

// Styles
const buttonStyle = {
  backgroundColor: '#1CAF9A',
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

  props: {
    colWidth: string,
    mobile: boolean,
    logo: string,
    login: Function,
    error: boolean,
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

  render() {
    const { colWidth, logo, mobile } = this.props;
    const topPadding = {
      paddingTop: mobile ? '8rem' : '16rem',
    };
    const formWidth = {
      maxWidth: colWidth,
    };
    return (
      <Grid relaxed centered style={topPadding}>
        <Grid.Column
          width={16}
          style={formWidth}
          textAlign="center"
          verticalAlign="middle"
          className="ppd-padding-1"
        >
          <Segment raised>
            <Image src={logo} size="small" centered />
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment basic padded>
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
                <Form.Button fluid primary size="large" style={buttonStyle}>
                  LOGIN
                </Form.Button>
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
