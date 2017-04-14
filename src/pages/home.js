/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import { Header, Image, Button, Grid } from 'semantic-ui-react';
import MediaQuery from 'react-responsive';
import _ from 'lodash';

import ContainerComponent from '../components/container';

import logo from '../images/logo_white.png';

const subHeaderStyle = {
  fontWeight: 300,
  color: '#fff',
  fontSize: '2.5rem',
};

const subHeaderStyleMobile = {
  fontWeight: 300,
  color: '#fff',
  fontSize: '1.5rem',
};

class HomePage extends Component {
  state = {
    loading: false,
    schedule: {},
  };

  render() {
    return (
      <ContainerComponent>
        <Grid relaxed>
          <Grid.Row>
            <Grid.Column floated="right" width={16}>
              <Button content="Sign In" floated="right" />
            </Grid.Column>
          </Grid.Row>
          {_.times(4, () => {
            return <Grid.Row />;
          })}
          {_.times(4, () => {
            return <Grid.Row only="computer" />;
          })}
          <Grid.Row>
            <Grid.Column width={16}>
              <MediaQuery maxDeviceWidth={1224}>
                {matches => {
                  if (matches) {
                    return (
                      <div>
                        <Image src={logo} size="medium" centered />
                        <Header
                          as="h1"
                          content="Simply Plan Your Training."
                          textAlign="center"
                          style={subHeaderStyleMobile}
                        />
                      </div>
                    );
                  }
                  return (
                    <div>
                      <Image src={logo} size="large" centered />
                      <Header
                        as="h1"
                        content="Simply Plan Your Training."
                        textAlign="center"
                        style={subHeaderStyle}
                      />
                    </div>
                  );
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
