// @flow
import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default class AuthModal extends Component {
  props: {
    open: false,
    title: string,
    submitBtnLabel: string,
    handleCancel: Function,
    handleSubmit: Function,
  };

  render() {
    const { open, title, submitBtnLabel, handleCancel, handleSubmit } = this
      .props;
    const actions = [
      <FlatButton label="Cancel" onTouchTap={handleCancel} />,
      <RaisedButton label={submitBtnLabel} primary onTouchTap={handleSubmit} />,
    ];

    return (
      <div>
        <Dialog title={title} actions={actions} modal open={open} />
      </div>
    );
  }
}
