// @flow
/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import { Header, Image, Button, Grid } from 'semantic-ui-react';
import MediaQuery from 'react-responsive';

import ContainerComponent from '../components/container';

import logo from '../images/logo_white.png';

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
    <div style={setHeroStyle(props.mobile).base}>
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
class HomePage extends Component {
  state = {
    loading: false,
  };

  render() {
    return (
      <ContainerComponent>
        <Grid relaxed>
          <Grid.Row>
            <Grid.Column floated="right" width={16}>
              <Button content="Log In" floated="right" inverted />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <MediaQuery maxDeviceWidth={1224}>
                {matches => {
                  if (matches) {
                    return <PlataHero mobile />;
                  }
                  return <PlataHero mobile={false} />;
                }}
              </MediaQuery>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </ContainerComponent>
    );
  }
}

export default HomePage;
