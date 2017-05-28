// @flow
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import firebase from 'firebase/app';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';

import { app, base } from '../rebase';

import AppContainer from '../components/AppContainer';

// Render Home page
export default class HomePage extends Component {
  state = {
    readyForSignup: false,
    loading: false,
    error: false,
    authModalOpen: true,
    authModalContentSignup: true,
    phoneNumber: '',
    recaptchaHandler: null,
    recaptchaSolved: false,
    showConfirmationCodeInput: false,
    confirmResults: null,
    confirmCode: '',
  };

  componentDidMount() {
    this.fetchReadyForSignup();
    this.initReCaptcha();
  }

  fetchReadyForSignup() {
    base
      .fetch('ready', {
        context: this,
      })
      .then(readyForSignup => {
        this.setState({ readyForSignup });
      });
  }

  initReCaptcha = () => {
    const self = this;
    const recaptchaHandler = new firebase.auth
      .RecaptchaVerifier('sbr-recaptcha-container', {
      size: 'normal',
      callback: function(response) {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log('reCAPTCHA solved');
        self.setState({ recaptchaSolved: true });
      },
      'expired-callback': function() {
        // Response expired. Ask user to solve reCAPTCHA again.
        console.log('Please solve reCAPTCHA again');
        this.setState({ error: true, loading: false });
      },
    });
    this.setState({ recaptchaHandler });
  };

  handleSigninClick = () => {
    this.setState({ authModalContentSignup: true, authModalOpen: true });
  };

  handleCancelModal = () => {
    this.setState({ authModalContentSignup: true, authModalOpen: true });
  };

  handleOAuthResult = () => {
    return app.auth().getRedirectResult().then(
      data => {
        if (data.user) this.props.history.push('/dashboard');
      },
      err => {
        if (err) this.setState({ error: true, loading: false });
      },
    );
  };

  setPhone = (evt: Object, phoneNumber: string) => {
    evt.preventDefault();
    this.setState({ phoneNumber });
  };

  setConfirmCode = (evt: Object, confirmCode: string) => {
    evt.preventDefault();
    this.setState({ confirmCode });
  };

  handleSignInByPhone = () => {
    firebase
      .auth()
      .signInWithPhoneNumber(
        `+1${this.state.phoneNumber}`,
        this.state.recaptchaHandler,
      )
      .then(confirmResults => {
        // SMS sent to mobile
        // Show input to enter code from SMS
        console.log(confirmResults);
        this.setState({ showConfirmationCodeInput: true, confirmResults });
        /*        var verificationCode = window.prompt(
          'Please enter the verification ' +
            'code that was sent to your mobile device.',
        );
        return confirmResults.confirm(verificationCode);*/
      })
      .catch(() => {
        this.setState({ error: true, loading: false });
      });
  };

  handleSubmitConfirmCode = () => {
    const { confirmResults, confirmCode } = this.state;
    if (confirmResults) {
      return confirmResults
        .confirm(confirmCode)
        .then(result => {
          if (result.user) this.props.history.push('/dashboard');
        })
        .catch(() => {
          this.setState({ error: true, loading: false });
        });
    }
  };

  props: {
    appState: Object,
    history: Object,
  };

  render() {
    return (
      <AppContainer pageTitle="Home">

        <div>
          <Dialog open modal>
            <div className="sbr-align-center ">
              <h3 className="sbr-margin-bottom-0">Sign In</h3>
              <div className="sbr-margin-top-half">
                <TextField
                  id="sbr-siginin-phone-input"
                  onChange={this.setPhone}
                />
                <TextField
                  id="sbr-siginin-confirm-code-input"
                  onChange={this.setConfirmCode}
                />
              </div>
              <RaisedButton
                primary
                icon={<FontIcon className={'fa fa-phone sbr-font-size-1-5'} />}
                label="Sign in with Mobile"
                onTouchTap={this.handleSignInByPhone}
              />
              <RaisedButton
                primary
                icon={<FontIcon className={'fa fa-phone sbr-font-size-1-5'} />}
                label="Submit Confirm Code"
                onTouchTap={this.handleSubmitConfirmCode}
              />
            </div>
            <div id="sbr-recaptcha-container" />
          </Dialog>
        </div>

      </AppContainer>
    );
  }
}
