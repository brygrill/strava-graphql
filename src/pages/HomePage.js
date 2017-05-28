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

const provider = new firebase.auth.GoogleAuthProvider();

// Render Home page
export default class HomePage extends Component {
  state = {
    authModalOpen: true,
    authModalContentSignup: true,
    number: '',
    phoneId: null,
    error: false,
    loading: false,
    readyForSignup: false,
  };

  componentDidMount() {
    this.handleOAuthResult();
    this.fetchReadyForSignup();

    const phoneId = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: function(response) {
        console.log(response);
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
      },
      'expired-callback': function() {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
      },
    });
    this.setState({ phoneId });
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

  handleSigninClick = () => {
    this.setState({ authModalContentSignup: true, authModalOpen: true });
  };

  handleCancelModal = () => {
    this.setState({ authModalContentSignup: true, authModalOpen: true });
  };

  handleLoginError = (err: Object) => {
    if (err) this.setState({ error: true, loading: false });
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

  handleGoogleOAuthSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault();
    this.setState({ authModalOpen: false, loading: true });
    app.auth().signInWithRedirect(provider).then(() => {
      return this.handleLoginError;
    });
  };

  setPhone = (evt: object, number: string) => {
    evt.preventDefault();
    console.log(number);
    this.setState({ number });
  };

  handleRecaptcha = () => {
    console.log('here');
    firebase
      .auth()
      .signInWithPhoneNumber('+17173336834', this.state.phoneId)
      .then(function(confirmationResult) {
        console.log(confirmationResult);
        var verificationCode = window.prompt(
          'Please enter the verification ' +
            'code that was sent to your mobile device.',
        );
        return confirmationResult.confirm(verificationCode);
      })
      .catch(function(error) {
        console.log(error);
        // Handle Errors here.
      });
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
              <h6 className="sbr-margin-top-half" />
              <TextField id="sbr-signin-by-phone" onChange={this.setPhone} />
              <RaisedButton
                primary
                icon={<FontIcon className={'fa fa-phone sbr-font-size-1-5'} />}
                label="Sign in with Phone Number"
                onTouchTap={this.handleRecaptcha}
              />
            </div>
            <div id="recaptcha-container" />
          </Dialog>
        </div>

      </AppContainer>
    );
  }
}
