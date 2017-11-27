// @flow
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-indent */
/* global grecaptcha */

import React, { Component } from 'react';
import firebase from 'firebase/app';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { LinearProgress } from 'material-ui/Progress';
import { withStyles, createStyleSheet } from 'material-ui/styles';

import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';

import fire from '../fire';
import { allowedFunctionUrl } from '../config';

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
      return 'A code will be sent to your phone. Standard messaging rates apply. US Only.';
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

// verify the number is allowed
const allowedUser = phone => {
  return fetch(allowedFunctionUrl(phone))
    .then(resp => {
      return resp.json();
    })
    .catch(() => {
      return false;
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

// STYLESHEET
const styleSheet = createStyleSheet('HomePage', theme => ({
  textField: {
    paddingBottom: '1.25rem',
    width: 250,
  },
}));

// HOME PAGE COMPONENT
// DISPLAYS SIGNIN BY PHONE
class HomePage extends Component {
  state = {
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

  props: {
    appState: Object,
    history: Object,
    classes: Object,
  };

  componentDidMount() {
    this.initReCaptcha();
  }

  setModalActions = (codeInput: boolean) => {
    return codeInput
      ? <Button
          key="sbr-siginin-confirm-code-input-key"
          raised
          color="primary"
          onClick={this.handleSubmitConfirmCode}
        >
          Submit Confirmation Code
        </Button>
      : <Button
          key="sbr-siginin-phone-input-key"
          raised
          color="primary"
          onClick={this.handleSignInByPhone}
        >
          Sign in with Mobile
        </Button>;
  };

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
  setPhone = (evt: Object) => {
    evt.preventDefault();
    const formattedNumber = formatPhoneNumber(evt.target.value);
    this.setState({ phoneNumber: formattedNumber });
  };

  setConfirmCode = (evt: Object) => {
    evt.preventDefault();
    const confirmCode = evt.target.value;
    this.setState({ confirmCode });
  };

  // HANDLE AUTH
  validatePhoneNumber = phone => {
    // set loading to true so you can see its working on it..
    this.setState({ loading: true });
    // start validate number
    const phoneUtil = PhoneNumberUtil.getInstance();
    // parse and convert to E164 format
    // validate the number and return
    // E164 format if it is valid
    return new Promise((resolve, reject) => {
      const tel = phoneUtil.parse(phone, 'US');
      const telE164 = phoneUtil.format(tel, PhoneNumberFormat.E164);
      // if number is allowed user
      // validate and format
      allowedUser(telE164.slice(2))
        .then(allowed => {
          if (allowed.valid) {
            const valid = phoneUtil.isValidNumberForRegion(tel, 'US');
            if (valid) return resolve(telE164);
            return reject(valid);
          } else {
            return reject(false);
          }
        })
        .catch(() => {
          return reject(false);
        });
    });
  };

  handleSignInByPhone = () => {
    return this.validatePhoneNumber(this.state.phoneNumber)
      .then(validNumber => {
        this.setState({
          instructionsMsg: 'recaptcha',
          validNumberError: false,
        });
        return fire
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
        console.log(invalid);
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

  // RENDER COMPONENT
  render() {
    const classes = this.props.classes;

    const {
      loading,
      instructionsMsg,
      validNumberError,
      showConfirmationCodeInput,
      phoneNumber,
      confirmCode,
    } = this.state;

    return (
      <AppContainer pageTitle="Home">
        <div>
          <Dialog open>
            <LinearProgress
              style={loading ? { display: 'inherit' } : { display: 'none' }}
            />
            <div>
              <DialogTitle>
                {'Sign In'}
              </DialogTitle>
              <DialogContent>
                <div>
                  <form>
                    <TextField
                      className={classes.textField}
                      id={
                        showConfirmationCodeInput
                          ? 'sbr-siginin-confirm-code-input'
                          : 'sbr-siginin-phone-input'
                      }
                      type={showConfirmationCodeInput ? 'text' : 'tel'}
                      label={
                        showConfirmationCodeInput
                          ? 'Confirmation Code'
                          : 'Phone Number'
                      }
                      helperText={
                        validNumberError ? 'Must be a valid US number' : ''
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

                  <DialogContentText>
                    {setInstructions(instructionsMsg)}
                  </DialogContentText>

                  <div className="mdl-grid" style={{ display: 'none' }}>
                    <div
                      className="mdl-cell--12-col"
                      id="sbr-recaptcha-container"
                    />
                  </div>

                </div>

              </DialogContent>
              <DialogActions>
                {this.setModalActions(showConfirmationCodeInput)}
              </DialogActions>
            </div>
          </Dialog>
        </div>
      </AppContainer>
    );
  }
}

export default withStyles(styleSheet)(HomePage);