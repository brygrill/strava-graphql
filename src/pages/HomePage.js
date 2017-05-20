// @flow
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import type { Children } from 'react';

import base from '../rebase';

import AppContainer from '../components/AppContainer';
import AppBar from '../components/AppBar';
import Hero from '../components/home/HomeHero';
import Card from '../components/home/HomeCard';
import HomeFooter from '../components/home/HomeFooter';
import AuthModal from '../components/AuthModal';

// Disable signup btns until ready
const btnsDisabled = true;

// Grid to wrap cards
const CardWrapper = (props: { children: Children }) => {
  return (
    <div className="mdl-cell mdl-cell--4-col-desktop mdl-cell--6-col-tablet mdl-cell--1m-offset-tablet mdl-cell--12-col mdl-cell--middle plata-home-individual-card">
      {props.children}
    </div>
  );
};

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
  };

  componentDidMount() {
    base.authGetOAuthRedirectResult(this.handleOAuthResult);
  }

  handleSignupClick = () => {
    this.setState({ authModalOpen: true });
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

  handleOAuthResult = (err: Object, data: Object) => {
    if (err) this.setState({ error: true, loading: false });
    if (data.user) this.props.history.push('/dashboard');
  };

  handleGoogleOAuthSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault();
    this.setState({ authModalOpen: false });
    base.authWithOAuthRedirect('google', this.handleLoginError);
  };

  props: {
    appState: Object,
    history: Object,
  };

  render() {
    const { authed } = this.props.appState;
    const { authModalContentSignup } = this.state;
    return (
      <AppContainer>

        <AppBar
          authed={authed}
          rightBtnLabel={authed ? 'Dashboard' : 'Sign in'}
          rightBtnIcon={authed ? '' : 'fa fa-google'}
          rightBtnHandler={
            authed ? this.handleDashboardClick : this.handleSigninClick
          }
        />

        <div className="mdl-grid plata-background-img plata-section-50">
          <Hero
            headline="Plata helps you plan your running & triathlon training."
            subhead="Add your plan to Plata. View and update it from anywhere. Focus on your swim, bike, run."
            btnLabel="Let's Go"
            onBtnClick={this.handleSignupClick}
          />
        </div>

        <div className="mdl-grid plata-section-40 plata-home-cards-section">
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

        <div className="mdl-grid plata-section-40 plata-back-prime-dark">
          <HomeFooter
            btnLabel="Get Started - It's Free"
            onBtnClick={this.handleSignupClick}
          />
        </div>

        <AuthModal
          title={authModalContentSignup ? 'Sign up for Plata' : 'Sign In'}
          sub={authModalContentSignup ? 'Get started with a free account' : ''}
          icon="fa fa-google plata-font-size-1-5"
          disabled={btnsDisabled}
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
                    className="plata-cursor-pointer"
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
                    className="plata-cursor-pointer"
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
