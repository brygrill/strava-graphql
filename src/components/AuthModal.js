// @flow
import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

export default class AuthModal extends Component {
  static defaultProps = {
    disabled: false,
    modal: false,
    open: false,
  };

  props: {
    open?: false,
    title: string,
    sub: string,
    icon: string,
    disabled?: boolean,
    modal?: boolean,
    submitBtnLabel: string,
    handleCancel: Function,
    handleSubmit: Function,
    alternative: any,
  };

  render() {
    const {
      open,
      title,
      sub,
      icon,
      disabled,
      modal,
      submitBtnLabel,
      handleCancel,
      handleSubmit,
      alternative,
    } = this.props;

    return (
      <div>
        <Dialog open={open} modal={modal} onRequestClose={handleCancel}>
          <div className="sbr-align-center ">
            <h3 className="sbr-margin-bottom-0">{title} </h3>
            <h6 className="sbr-margin-top-half">{sub}</h6>
            <RaisedButton
              primary
              disabled={disabled}
              icon={<FontIcon className={icon} />}
              label={submitBtnLabel}
              onTouchTap={handleSubmit}
            />
            <div>{alternative}</div>
          </div>
        </Dialog>
      </div>
    );
  }
}
