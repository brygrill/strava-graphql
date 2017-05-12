// @flow
import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

import BaseContainer from '../components/BaseContainer';
import HomeHeader from '../components/HomeHeader';
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
        <div className="mdl-grid plata-background plata-section-40">
          <HomeHeader
            headline="Plata helps you plan your running & triathlon training."
            subhead="Add your plan to Plata. View and update it from anywhere. Focus on your swimming, biking and running."
            btnLabel="Join The Beta"
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

        <div className="mdl-grid plata-section-30 plata-back-dark">
          <div className="mdl-cell mdl-cell--12-col">
            <Paper style={style} zDepth={1} />
          </div>
          <div className="mdl-cell mdl-cell--6-col">
            <FlatButton label="Primary" primary />
          </div>
          <div className="mdl-cell mdl-cell--6-col">
            <FlatButton label="Secondary" secondary />
          </div>
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
