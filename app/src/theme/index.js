// @flow
import { createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import lightBlue from 'material-ui/colors/lightBlue';
import green from 'material-ui/colors/green';

const theme = createMuiTheme({
  palette: createPalette({
    primary: lightBlue,
    accent: {
      ...green,
      A400: '#00e677',
    },
    type: 'dark',
  }),
});

export default theme;
