// @flow
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-indent */
/* global grecaptcha */

import React, { Component } from 'react';
import firebase from 'firebase/app';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import LinearProgress from 'material-ui/LinearProgress';

import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';

import { app } from '../rebase';

import AppContainer from '../components/AppContainer';

// HELPER FUNCTIONS
// Form messages
const setInstructions = instrux => {
  switch (instrux) {
    case 'recaptcha':
      return 'If prompted, please solve the reCAPTCHA puzzle to confirm you are a human.';
    case 'recaptcha-expired':
      return 'Your chance to solve the puzzle expired! Please try again.';
    case 'confirm':
      return 'Your code has been sent. Check your phone!';
    case 'error':
      return 'Something went wrong, please try again!';
    default:
      return 'A sign in code will be sent to your phone. Standard messaging rates apply. US Only.';
  }
};

// Format phone number input
const formatPhoneNumber = input => {
  // string non numbers and limit to 10 digits
  let phone = input.replace(/\D/g, '');
  phone = phone.substring(0, 10);

  // format based on size
  const size = phone.length;

  if (size < 4) phone = `(${phone}`;
  else if (size < 7) {
    phone = `(${phone.substring(0, 3)}) ${phone.substring(3, 6)}`;
  } else {
    phone = `(${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6, 10)}`;
  }
  return phone;
};

// Validate phone number
const validatePhoneNumber = phone => {
  const phoneUtil = PhoneNumberUtil.getInstance();
  // parse and convert to E164 format
  // validate the number and return
  // E164 format if it is valid
  return new Promise((resolve, reject) => {
    console.log('here');
    const tel = phoneUtil.parse(phone, 'US');
    console.log(tel);
    const telE164 = phoneUtil.format(tel, PhoneNumberFormat.E164);
    console.log(telE164);
    const valid = phoneUtil.isValidNumberForRegion(tel, 'US');
    console.log(valid);
    if (valid) return resolve(telE164);
    return reject(valid);
  });
};

// Reset state
const resetState = {
  loading: false,
  error: false,
  validNumberError: false,
  phoneNumber: '',
  confirmCode: '',
  instructionsMsg: 'phone',
  recaptchaSolved: false,
  recaptchaExpired: false,
  showConfirmationCodeInput: false,
  confirmResults: null,
};

// HOME PAGE COMPONENT
// DISPLAYS SIGNIN BY PHONE
export default class HomePage extends Component {
  state = {
    readyForSignup: true,
    loading: false,
    error: false,
    validNumberError: false,
    authModalOpen: true,
    authModalContentSignup: true,
    phoneNumber: '',
    confirmCode: '',
    instructionsMsg: 'phone',
    recaptchaHandler: null,
    recaptchaSolved: false,
    recaptchaExpired: false,
    showConfirmationCodeInput: false,
    confirmResults: null,
  };

  componentDidMount() {
    this.initReCaptcha();
  }

  // PREP COMPONENT
  initReCaptcha = () => {
    const self = this;
    const recaptchaHandler = new firebase.auth
      .RecaptchaVerifier('sbr-recaptcha-container', {
      size: 'invisible',
      callback: function(response) {
        self.setState({ recaptchaSolved: true });
      },
      'expired-callback': function() {
        self.setState({
          error: true,
          loading: false,
          recaptchaExpired: true,
          instructionsMsg: 'recaptcha-expired',
        });
      },
    });
    this.setState({ recaptchaHandler });
  };

  // HANDLE INPUTS
  setPhone = (evt: Object, phoneNumber: string) => {
    evt.preventDefault();
    const formattedNumber = formatPhoneNumber(phoneNumber);
    this.setState({ phoneNumber: formattedNumber });
  };

  setConfirmCode = (evt: Object, confirmCode: string) => {
    evt.preventDefault();
    this.setState({ confirmCode });
  };

  // HANDLE AUTH
  handleSignInByPhone = () => {
    return validatePhoneNumber(this.state.phoneNumber)
      .then(validNumber => {
        this.setState({
          instructionsMsg: 'recaptcha',
          validNumberError: false,
        });
        return app
          .auth()
          .signInWithPhoneNumber(validNumber, this.state.recaptchaHandler)
          .then(confirmResults => {
            // SMS sent to mobile
            // Show input to enter code from SMS
            this.setState({
              instructionsMsg: 'confirm',
              showConfirmationCodeInput: true,
              confirmResults,
              phoneNumber: '',
              loading: true,
            });
          })
          .catch(() => {
            this.setState({
              error: true,
              loading: false,
              instructionsMsg: 'error',
            });
            if (this.state.recaptchaHandler) {
              this.state.recaptchaHandler.render().then(widgetId => {
                // $FlowFixMe
                grecaptcha.reset(widgetId);
              });
            }
          });
      })
      .catch(invalid => {
        this.setState({
          error: true,
          validNumberError: true,
          loading: false,
          instructionsMsg: 'error',
        });
      });
  };

  handleSubmitConfirmCode = () => {
    const { confirmResults, confirmCode } = this.state;
    if (confirmResults) {
      return confirmResults
        .confirm(confirmCode)
        .then(result => {
          this.setState(resetState);
          if (result.user) this.props.history.push('/dashboard');
        })
        .catch(() => {
          this.setState({
            error: true,
            loading: false,
            instructionsMsg: 'error',
          });
        });
    }
  };

  // PROPS
  props: {
    appState: Object,
    history: Object,
  };

  // RENDER COMPONENT
  render() {
    const {
      loading,
      readyForSignup,
      instructionsMsg,
      validNumberError,
      showConfirmationCodeInput,
      phoneNumber,
      confirmCode,
    } = this.state;

    const actions = showConfirmationCodeInput
      ? [
          <RaisedButton
            primary
            key="sbr-siginin-confirm-code-input-key"
            label="Submit Confirmation Code"
            onTouchTap={this.handleSubmitConfirmCode}
          />,
        ]
      : [
          <RaisedButton
            primary
            disabled={!readyForSignup}
            key="sbr-siginin-phone-input-key"
            icon={<FontIcon className={'fa fa-phone sbr-font-size-1-5'} />}
            label="Sign in with Mobile"
            onTouchTap={this.handleSignInByPhone}
          />,
        ];

    return (
      <AppContainer pageTitle="Home">

        <div>
          <Dialog open modal actions={actions}>
            <LinearProgress
              style={loading ? { display: 'inherit' } : { display: 'none' }}
              mode="indeterminate"
            />
            <div>

              <h3 className="sbr-margin-bottom-0">Sign In</h3>

              <div className="sbr-margin-top-half">
                <form>
                  <TextField
                    id={
                      showConfirmationCodeInput
                        ? 'sbr-siginin-confirm-code-input'
                        : 'sbr-siginin-phone-input'
                    }
                    type={showConfirmationCodeInput ? 'text' : 'tel'}
                    floatingLabelText={
                      showConfirmationCodeInput
                        ? 'Confirmation Code'
                        : 'Phone Number'
                    }
                    errorText={
                      validNumberError ? 'Must be a valid US number' : null
                    }
                    onChange={
                      showConfirmationCodeInput
                        ? this.setConfirmCode
                        : this.setPhone
                    }
                    value={
                      showConfirmationCodeInput ? confirmCode : phoneNumber
                    }
                  />
                </form>

                <div className="sbr-padding-1-top sbr-grey500">
                  {setInstructions(instructionsMsg)}
                </div>

                <div className="mdl-grid" style={{ display: 'none' }}>
                  <div
                    className="mdl-cell--12-col"
                    id="sbr-recaptcha-container"
                  />
                </div>

              </div>
            </div>
          </Dialog>
        </div>

      </AppContainer>
    );
  }
}
