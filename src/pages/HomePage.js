// @flow
import React, { Component } from 'react';

import Paper from 'material-ui/Paper';

import BaseContainer from '../components/BaseContainer';
import HomeHeader from '../components/HomeHeader';
import HomeFooter from '../components/HomeFooter';
import JoinModal from '../components/JoinModal';

const style = {
  height: '100%',
  width: '100%',
  textAlign: 'center',
  display: 'inline-block',
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
        <div className="mdl-grid plata-background-img plata-section-40">
          <HomeHeader
            headline="Plata helps you plan your running & triathlon training."
            subhead="Add your plan to Plata. View and update it from anywhere. Focus on your swim, bike, run."
            btnLabel="Let's Go"
            onBtnClick={this.handleJoinClick}
          />
        </div>

        <div className="mdl-grid plata-section-40">
          <div className="mdl-cell mdl-cell--4-col">
            <Paper style={style} zDepth={1} />
          </div>
          <div className="mdl-cell mdl-cell--4-col">
            <Paper style={style} zDepth={1} />
          </div>
          <div className="mdl-cell mdl-cell--4-col">
            <Paper style={style} zDepth={1} />
          </div>
        </div>

        <div className="mdl-grid plata-section-30 plata-back-prime-dark">
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
