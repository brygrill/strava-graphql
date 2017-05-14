// @flow
import React, { Component } from 'react';
import type { Children } from 'react';

import BaseContainer from '../components/BaseContainer';
import Hero from '../components/HomeHero';
import Card from '../components/HomeCard';
import HomeFooter from '../components/HomeFooter';
import JoinModal from '../components/JoinModal';

import swim from '../images/icons/swim_circle_white.svg';

const CardWrapper = (props: { children: Children }) => {
  return (
    <div className="mdl-cell mdl-cell--4-col-desktop mdl-cell--6-col-tablet mdl-cell--1-offset-tablet mdl-cell--12-col mdl-cell--middle home-individual-card">
      {props.children}
    </div>
  );
};
// Render hero page
export default class HomePage extends Component {
  state = {
    joinModalOpen: false,
    loginModalOpen: false,
  };

  handleJoinClick = () => {
    console.log('signup!');
    this.setState({ joinModalOpen: true });
  };

  handleJoinSubmit = () => {
    console.log('Open OAuth...');
    // rebase function here
    // show loader...
    this.setState({ joinModalOpen: false });
  };

  handleCancelModal = () => {
    console.log('Cancel btn click...');
    this.setState({ joinModalOpen: false, loginModalOpen: false });
  };

  props: {
    appState: Object,
  };

  render() {
    return (
      <BaseContainer authed={this.props.appState.authed}>
        <div className="mdl-grid plata-background-img plata-section-50">
          <Hero
            headline="Plata helps you plan your running & triathlon training."
            subhead="Add your plan to Plata. View and update it from anywhere. Focus on your swim, bike, run."
            btnLabel="Let's Go"
            onBtnClick={this.handleJoinClick}
          />
        </div>

        <div className="mdl-grid plata-section-40 home-cards-section">
          <CardWrapper>
            <Card
              title="Set Your Plan"
              img={swim}
              alt="set plata plan card"
              imgClass="plata-back-prime-light"
              content="Select a plan length. Build a weekly schedule. Tailor each week."
            />
          </CardWrapper>

          <CardWrapper>
            <Card
              title="Set Your Plan"
              img={swim}
              alt="set plata plan card"
              imgClass="plata-back-prime-light"
              content="Select a plan length. Build a weekly schedule. Tailor each week."
            />
          </CardWrapper>

          <CardWrapper>
            <Card
              title="Set Your Plan"
              img={swim}
              alt="set plata plan card"
              imgClass="plata-back-prime-light"
              content="Select a plan length. Build a weekly schedule. Tailor each week."
            />
          </CardWrapper>
        </div>

        <div className="mdl-grid plata-section-40 plata-back-prime-dark">
          <HomeFooter
            btnLabel="Get Started - It's Free"
            onBtnClick={this.handleJoinClick}
          />
        </div>

        <JoinModal
          open={this.state.joinModalOpen}
          handleCancel={this.handleCancelModal}
          handleSubmit={this.handleJoinSubmit}
        />

      </BaseContainer>
    );
  }
}
