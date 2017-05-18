// @flow
import React, { Component } from 'react';
import type { Children } from 'react';

import base from '../rebase';

import AppContainer from '../components/AppContainer';
import AppBar from '../components/AppBar';
import Hero from '../components/home/HomeHero';
import Card from '../components/home/HomeCard';
import HomeFooter from '../components/home/HomeFooter';
import AuthModal from '../components/AuthModal';

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
    joinModalOpen: false,
    error: false,
    loading: false,
  };

  componentDidMount() {
    base.authGetOAuthRedirectResult(this.handleOAuthResult);
  }

  handleJoinClick = () => {
    this.setState({ joinModalOpen: true });
  };

  handleDashboardClick = () => {
    this.props.history.push('/dashboard');
  };

  handleCancelModal = () => {
    this.setState({ joinModalOpen: false });
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
    this.setState({ joinModalOpen: false });
    base.authWithOAuthRedirect('google', this.handleLoginError);
  };

  props: {
    appState: Object,
    history: Object,
  };

  render() {
    const { authed } = this.props.appState;
    return (
      <AppContainer>

        <AppBar
          authed={authed}
          rightBtnLabel={authed ? 'Dashboard' : 'Sign in'}
          rightBtnIcon={authed ? '' : 'fa fa-google'}
          rightBtnHandler={
            authed ? this.handleDashboardClick : this.handleGoogleOAuthSubmit
          }
        />

        <div className="mdl-grid plata-background-img plata-section-50">
          <Hero
            headline="Plata helps you plan your running & triathlon training."
            subhead="Add your plan to Plata. View and update it from anywhere. Focus on your swim, bike, run."
            btnLabel="Let's Go"
            onBtnClick={this.handleJoinClick}
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
            onBtnClick={this.handleJoinClick}
          />
        </div>

        <AuthModal
          title="Signup with your Google account"
          submitBtnLabel="Signup with Google"
          open={this.state.joinModalOpen}
          handleCancel={this.handleCancelModal}
          handleSubmit={this.handleGoogleOAuthSubmit}
        />

      </AppContainer>
    );
  }
}
