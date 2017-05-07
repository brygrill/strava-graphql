// @flow
import React, { Component } from 'react';
import { Header, Image, Grid } from 'semantic-ui-react';
import MediaQuery from 'react-responsive';

import PublicContainer from '../containers/public';

import LoginButtonComponent from '../components/login/login-header-btn';

import logo from '../images//logos/logo_white.png';

import swim from '../images/icons/swim_circle_white.svg';
import bike from '../images/icons/bike_circle_white.svg';
import run from '../images/icons/run_circle_white.svg';
import lift from '../images/icons/lift_circle_white.svg';

// Styles to make flex layout work

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

const iconGroupStyle = {
  textAlign: 'center',
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
const PlataHero = (props: { mobile: boolean, tiny: boolean }) => {
  return (
    <div key="plata-hero-1">
      <Image src={logo} size={props.mobile ? 'medium' : 'large'} centered />
      <Header
        as="h1"
        content="Simple Weekly Training Templates."
        textAlign="center"
        style={setHeroStyle(props.mobile).header}
      />
      <Image.Group size={props.tiny ? 'mini' : 'tiny'} style={iconGroupStyle}>
        <Image src={swim} />
        <Image src={bike} />
        <Image src={run} />
        <Image src={lift} />
      </Image.Group>
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
      <PublicContainer>
        hi
      </PublicContainer>
    );
  }
}

/*

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
                authedLabel="Dashboard"
                noAuthedTo="/login"
                noAuthedLabel="Get Started"
              />
            </Grid.Column>
          </Grid.Row>
          <div>
            <Grid.Column width={16} style={headerColStyle}>
              <MediaQuery minDeviceWidth={1224}>
                <PlataHero mobile={false} tiny={false} />
              </MediaQuery>
              <MediaQuery minWidth={321} maxWidth={1224}>
                <PlataHero mobile tiny={false} />
              </MediaQuery>
              <MediaQuery maxWidth={320}>
                <PlataHero mobile tiny />
              </MediaQuery>
            </Grid.Column>
          </div>
        </Grid>
      </ContainerComponent>
 */
