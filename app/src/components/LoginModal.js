import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Header, Message, Image } from 'semantic-ui-react';

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

const styles = {
  input: {
    padding: '0 0 1rem 0',
  },
};

export default class AuthBoundary extends Component {
  render() {
    return (
      <Modal open basic>
        <Image src={logo} size="small" centered />
        <Modal.Content>
          <Form onSubmit={this.props.onSubmit} error={this.props.error}>
            <Form.Group>
              <Form.Input
                placeholder="Email"
                name="email"
                width={7}
                type="email"
                style={styles.input}
                onChange={this.props.onChange}
              />
              <Form.Input
                placeholder="Password"
                name="password"
                width={7}
                type="password"
                style={styles.input}
                onChange={this.props.onChange}
              />
              <Form.Button
                content="Sign in"
                width={2}
                color="blue"
                fluid
                // style={styles.input}
              />
            </Form.Group>
            <Message
              error
              header="Invalid Sign in"
              content="Please enter valid credentials."
            />
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

AuthBoundary.propTypes = propTypes;
AuthBoundary.defaultProps = defaultProps;
