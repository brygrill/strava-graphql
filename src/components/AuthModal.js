// @flow
import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

export default class AuthModal extends Component {
  props: {
    open: false,
    title: string,
    sub: string,
    icon: string,
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
      submitBtnLabel,
      handleCancel,
      handleSubmit,
      alternative,
    } = this.props;

    return (
      <div>
        <Dialog open={open} onRequestClose={handleCancel}>
          <div className="plata-align-center ">
            <h3 className="plata-margin-bottom-0">{title} </h3>
            <h6 className="plata-margin-top-half">{sub}</h6>
            <RaisedButton
              primary
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
