// @flow
import React, { Component } from 'react';
import { Header, Image, Grid } from 'semantic-ui-react';
import MediaQuery from 'react-responsive';

import ContainerComponent from '../components/container';
import LoginButtonComponent from '../components/login/login-header-btn';

import logo from '../images/logo_white.png';

// Styles to make flex layout work
const pageStyle = {
  padding: 0,
  margin: 0,
  width: '100%',
};

const loginRowStyle = {
  display: 'block',
  padding: 0,
  marginTop: '1rem',
};

const loginColStyle = {
  padding: 0,
};

const headerColStyle = {
  marginTop: '-1rem',
};

// Set styles for hero logo based on screen size
const setHeroStyle = mobile => {
  return {
    base: {
      paddingTop: mobile ? '8rem' : '16rem',
    },
    header: {
      fontWeight: 300,
      color: '#fff',
      fontSize: mobile ? '1.5rem' : '2.5rem',
    },
  };
};

// Hero component logo and subheader
const PlataHero = (props: { mobile: boolean }) => {
  return (
    <div key="plata-hero-1">
      <Image src={logo} size="large" centered />
      <Header
        as="h1"
        content="Simply Plan Your Training."
        textAlign="center"
        style={setHeroStyle(props.mobile).header}
      />
    </div>
  );
};

// Render hero page
export default class HomePage extends Component {
  state = {};

  props: {
    appState: Object,
  };

  render() {
    const { appState } = this.props;
    return (
      <ContainerComponent>
        <Grid
          width={16}
          style={pageStyle}
          textAlign="center"
          verticalAlign="middle"
        >
          <Grid.Row style={loginRowStyle}>
            <Grid.Column floated="right" width={16} style={loginColStyle}>
              <LoginButtonComponent
                authed={appState.authed}
                authedTo="/dashboard"
                authedLabel="DASHBOARD"
                noAuthedTo="/login"
                noAuthedLabel="LOGIN"
              />
            </Grid.Column>
          </Grid.Row>
          <div>
            <Grid.Column width={16} style={headerColStyle}>
              <MediaQuery maxDeviceWidth={1224}>
                {matches => {
                  return <PlataHero mobile={matches} />;
                }}
              </MediaQuery>
            </Grid.Column>
          </div>
        </Grid>
      </ContainerComponent>
    );
  }
}
