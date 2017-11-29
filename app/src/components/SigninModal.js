import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Form, Header, Modal, Message, Image } from 'semantic-ui-react';

import logo from '../images/logo-gray.png';

const propTypes = {
  error: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

const defaultProps = {
  authed: false,
  error: true,
};

export default class AuthBoundary extends Component {
  render() {
    return (
      <Modal open basic>
        <Modal.Content>
          <Grid>
            <Grid.Column width={4} only="computer tablet" />
            <Grid.Column width={16} computer={8} tablet={8}>
              <Grid.Row>
                <Image src={logo} size="small" centered />
                <Header as="h2" content="Sign in to SBR Training" inverted textAlign="center" />
                <Form onSubmit={this.props.onSubmit} error={this.props.error}>
                  <Form.Input
                    placeholder="Email"
                    name="email"
                    width={16}
                    type="email"
                    onChange={this.props.onChange}
                  />
                  <Form.Input
                    placeholder="Password"
                    name="password"
                    width={16}
                    type="password"
                    onChange={this.props.onChange}
                  />
                  <Form.Button
                    content="Sign in"
                    width={16}
                    color="blue"
                    fluid
                  />
                  <Message
                    error
                    header="Invalid Sign in"
                    content="Please enter valid credentials."
                  />
                </Form>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={4} only="computer" />
          </Grid>
        </Modal.Content>
      </Modal>
    );
  }
}

AuthBoundary.propTypes = propTypes;
AuthBoundary.defaultProps = defaultProps;
