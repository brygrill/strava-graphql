// @flow
import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class AuthModal extends Component {
  props: {
    open: false,
    title: string,
    handleCancel: Function,
    handleSubmit: Function,
  };

  render() {
    const { open, title, handleCancel, handleSubmit } = this.props;
    const actions = [
      <FlatButton label="Cancel" onTouchTap={handleCancel} />,
      <FlatButton label="Submit" primary onTouchTap={handleSubmit} />,
    ];

    return (
      <div>
        <Dialog title={title} actions={actions} modal open={open} />
      </div>
    );
  }
}
