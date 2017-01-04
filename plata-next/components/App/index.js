import React, { PropTypes } from 'react';
import { Container } from 'semantic-ui-react';
import Head from '../Head';

const App = (props) => {
  return (
    <div>
      <Head title={props.pgTitle} />
      <Container fluid className="plata-height-100">
        <div className="plata-height-100">
          {props.children}
        </div>
      </Container>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.node,
  pgTitle: PropTypes.string,
};

export default App;
