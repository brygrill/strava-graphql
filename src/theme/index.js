// @flow
import { createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import lightBlue from 'material-ui/colors/lightBlue';

const theme = createMuiTheme({
  palette: createPalette({
    primary: lightBlue,
  }),
});

export default theme;
