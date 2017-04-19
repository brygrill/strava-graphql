// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header, Image, Button, Grid } from 'semantic-ui-react';
import MediaQuery from 'react-responsive';
import Transition from 'react-motion-ui-pack';

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
    <Transition component={false} enter={{ opacity: 1 }} leave={{ opacity: 0 }}>
      <div style={setHeroStyle(props.mobile).base} key="plata-hero-1">
        <Image src={logo} size="large" centered />
        <Header
          as="h1"
          content="Simply Plan Your Training."
          textAlign="center"
          style={setHeroStyle(props.mobile).header}
        />
      </div>
    </Transition>
  );
};

// Render hero page
class HomePage extends Component {
  state = {
    loading: false,
  };

  props: {
    appState: Object,
  };

  render() {
    console.log(this.props);
    return (
      <ContainerComponent>
        <Grid relaxed>
          <Grid.Row>
            <Grid.Column floated="right" width={16}>
              <Link to="/login">
                <Button content="Log In" floated="right" inverted />
              </Link>
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
