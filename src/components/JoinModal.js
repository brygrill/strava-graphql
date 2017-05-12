// @flow
import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class DialogExampleModal extends Component {
  props: {
    open: false,
    handleCancel: Function,
    handleSubmit: Function,
  };

  render() {
    const actions = [
      <FlatButton label="Cancel" onTouchTap={this.props.handleCancel} />,
      <FlatButton
        label="Submit"
        primary
        onTouchTap={this.props.handleSubmit}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Signup With Google"
          actions={actions}
          modal
          open={this.props.open}
        />
      </div>
    );
  }
}
