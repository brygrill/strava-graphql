import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Head from '../Head';
import './tap';

// Set theme
const muiTheme = getMuiTheme({ userAgent: false });

const App = (props) => {
  return (
    <div>
      <Head title={props.pgTitle} />
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          {props.children}
        </div>
      </MuiThemeProvider>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.node,
  pgTitle: PropTypes.string,
};

export default App;
