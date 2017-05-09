// @flow
import React, { Component } from 'react';
import { Header, Image, Grid, Button } from 'semantic-ui-react';

import PublicContainer from '../containers/public';

import RowComponent from '../components/row';

import { colors } from '../css';

import logo from '../images//logos/logo_white.png';

import swim from '../images/icons/swim_circle_white.svg';
import bike from '../images/icons/bike_circle_white.svg';
import run from '../images/icons/run_circle_white.svg';
import lift from '../images/icons/lift_circle_white.svg';

const styles = {
  align: {
    textAlign: 'center',
  },
  height20: {
    height: '20rem',
  },
  height40: {
    height: '40rem',
  },
  backgroundLight: {
    backgroundColor: colors.light,
  },
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
      <Image.Group size={props.tiny ? 'mini' : 'tiny'} style={styles.textAlign}>
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
  props: {
    appState: Object,
  };

  render() {
    return (
      <PublicContainer>
        <Grid style={{ paddingTop: '52.91px' }}>
          <RowComponent
            style={Object.assign({}, styles.height40)}
            className="plata-background"
            width={16}
            align="middle"
          >
            <Header
              content="Simply Plan Your Training"
              textAlign="center"
              as="h1"
              inverted
            />
            <Header
              content="Plata lets you quickly view and manage your weekly training schedule, so you can focus on hitting your workouts."
              textAlign="center"
              as="h2"
              inverted
            />
            <Button content="Lets Go" className="plata-signup-btn" />
          </RowComponent>
          <RowComponent style={Object.assign({}, styles.height20)} width={16}>
            some other interesting stuff
          </RowComponent>
          <RowComponent style={Object.assign({}, styles.height20)} width={16}>
            some other interesting stuff
          </RowComponent>
          <RowComponent
            style={Object.assign({}, styles.height20, styles.backgroundLight)}
            width={16}
          >
            sign up
          </RowComponent>
        </Grid>
      </PublicContainer>
    );
  }
}
