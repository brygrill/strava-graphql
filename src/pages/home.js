/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';

//import ScheduleComponent from '../components/schedule';
import ContainerComponent from '../components/container';

//import getSchedule from '../firebase/get-schedule';

/*async function buildSchedule() {
  const schedule = await getSchedule('grill');
  return schedule;
}*/

class HomePage extends Component {
  state = {
    loading: false,
    schedule: {},
  };

  render() {
    const content = this.state.loading
      ? <Dimmer active>
          <Loader />
        </Dimmer>
      : <ContainerComponent>
          <div>hi</div>
        </ContainerComponent>;
    return content;
  }
}

export default HomePage;
