// @flow
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import firebase from 'firebase/app';

import { app, base } from '../rebase';

import AppContainer from '../components/AppContainer';
import AppBar from '../components/AppBar';
import Hero from '../components/home/HomeHero';
import Card from '../components/home/HomeCard';
import CardWrapper from '../components/home/HomeCardWrap';
import HomeFooter from '../components/home/HomeFooter';
import AuthModal from '../components/AuthModal';

const provider = new firebase.auth.GoogleAuthProvider();

// Card content
const cardContent = [
  {
    title: 'Create',
    background: '#4caf50',
    icon: 'fa fa-wrench',
    content: 'Build a weekly template & customize each week of your plan.',
  },
  {
    title: 'Manage',
    background: '#fbc02d',
    icon: 'fa fa-tachometer',
    content: 'View workouts, weekly schedule & stats from any device.',
  },
  {
    title: 'Adjust',
    background: '#00acc1',
    icon: 'fa fa-sliders',
    content: 'Update workout details & move workouts around with ease.',
  },
];

// Render Home page
export default class HomePage extends Component {
  state = {
    authModalOpen: false,
    authModalContentSignup: true,
    error: false,
    loading: false,
    readyForSignup: false,
  };

  componentDidMount() {
    // base.authGetOAuthRedirectResult(this.handleOAuthResult);
    this.handleOAuthResult();
    this.fetchReadyForSignup();
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

  handleSignupClick = () => {
    this.setState({ authModalContentSignup: true, authModalOpen: true });
  };

  handleSigninClick = () => {
    this.setState({ authModalContentSignup: false, authModalOpen: true });
  };

  handleAlternativeClick = () => {
    const { authModalContentSignup } = this.state;
    this.setState({ authModalContentSignup: !authModalContentSignup });
  };

  handleDashboardClick = () => {
    this.props.history.push('/dashboard');
  };

  handleCancelModal = () => {
    this.setState({ authModalOpen: false });
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
    // base.authWithOAuthRedirect('google', this.handleLoginError);
    app.auth().signInWithRedirect(provider).then(() => {
      return this.handleLoginError;
    });
  };

  props: {
    appState: Object,
    history: Object,
  };

  render() {
    const { authed } = this.props.appState;
    const { authModalContentSignup } = this.state;
    return (
      <AppContainer pageTitle={null}>

        <AppBar
          authed={authed}
          rightBtnLabel={authed ? 'Dashboard' : 'Sign in'}
          rightBtnIcon={authed ? '' : 'fa fa-google'}
          rightBtnHandler={
            authed ? this.handleDashboardClick : this.handleSigninClick
          }
        />

        <div className="mdl-grid sbr-back-prime sbr-section-50">
          <Hero
            headline="TriPlan helps you plan your triathlon & run training."
            subhead="Add your plan to TriPlan. View and update it from anywhere. Focus on your swim, bike, run."
            btnLabel="Let's Go"
            onBtnClick={
              authed ? this.handleDashboardClick : this.handleSignupClick
            }
          />
        </div>

        <div className="mdl-grid sbr-section-40 sbr-home-cards-section">
          {cardContent.map(card => {
            return (
              <CardWrapper key={card.title}>
                <Card
                  title={card.title}
                  background={card.background}
                  icon={card.icon}
                  content={card.content}
                />
              </CardWrapper>
            );
          })}
        </div>

        <div className="mdl-grid sbr-section-40 sbr-back-prime-dark">
          <HomeFooter
            btnLabel="Get Started - It's Free"
            onBtnClick={
              authed ? this.handleDashboardClick : this.handleSignupClick
            }
          />
        </div>

        <AuthModal
          title={authModalContentSignup ? 'Sign up for TriPlan' : 'Sign In'}
          sub={authModalContentSignup ? 'Get started with a free account' : ''}
          icon="fa fa-google sbr-font-size-1-5"
          disabled={!this.state.readyForSignup}
          submitBtnLabel="Sign in with Google"
          open={this.state.authModalOpen}
          handleCancel={this.handleCancelModal}
          handleSubmit={this.handleGoogleOAuthSubmit}
          alternative={
            authModalContentSignup
              ? <h6>
                  Or
                  {' '}
                  <a
                    role="button"
                    className="sbr-cursor-pointer"
                    onClick={this.handleAlternativeClick}
                  >
                    sign in
                  </a>
                  {' '}
                  to your existing account
                </h6>
              : <h6>
                  Or
                  {' '}
                  <a
                    role="button"
                    className="sbr-cursor-pointer"
                    onClick={this.handleAlternativeClick}
                  >
                    sign up
                  </a>
                  {' '}
                  for a new account
                </h6>
          }
        />

      </AppContainer>
    );
  }
}
